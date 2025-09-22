// client/src/components/MoodGraph.js
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { getMoodHistory, getUserMoodHistory } from "../../services/api";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register Chart.js components + plugin
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  zoomPlugin
);

const moodMap = { Happy: 5, Calm: 4, Tired: 3, Sad: 2, Angry: 1 };
const revMoodMap = { 5: "😊 Happy", 4: "😌 Calm", 3: "😴 Tired", 2: "😢 Sad", 1: "😡 Angry" };

export default function MoodGraph() {
  const [moodData, setMoodData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchMoods = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let res;
      if (user && user.email) {
        // Fetch user-specific mood data
        res = await getUserMoodHistory(user.email);
      } else {
        // Fallback to all moods if no user
        res = await getMoodHistory();
      }
      
      const newData = res.data || [];

      // ✅ Preserve zoom: update chart data without resetting zoom
      if (chartRef.current) {
        const chart = chartRef.current;
        chart.data.labels = newData.map((d) =>
          new Date(d.createdAt || Date.now()).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short",
          })
        );
        chart.data.datasets[0].data = newData.map((d) => moodMap[d.mood] || 0);
        chart.update("none"); // 👈 prevents reset / animation
      }

      setMoodData(newData);
    } catch (err) {
      console.error("❌ Error fetching moods:", err);
      // If mindfulness backend is not running, show empty state instead of error
      setMoodData([]);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMoods();
    const interval = setInterval(fetchMoods, 5000);
    return () => {
      clearInterval(interval);
      // Cleanup chart on unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [fetchMoods]);

  useEffect(() => {
    const handler = () => fetchMoods();
    window.addEventListener("moodSaved", handler);
    return () => {
      window.removeEventListener("moodSaved", handler);
    };
  }, [fetchMoods]);

  const data = {
    labels: moodData.map((d) =>
      new Date(d.createdAt || Date.now()).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
      })
    ),
    datasets: [
      {
        label: "Mood Trend",
        data: moodData.map((d) => moodMap[d.mood] || 0),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false, // Disable animations to prevent zoom reset
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 20
      }
    },
    plugins: {
      legend: { 
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (ctx) => revMoodMap[ctx.parsed.y] || ctx.parsed.y,
        },
      },
      zoom: {
        limits: {
          y: {min: 0.8, max: 5.2},
          x: {min: 'original', max: 'original'}
        },
        pan: { 
          enabled: true, 
          mode: "x",
          threshold: 10
        },
        zoom: {
          wheel: { 
            enabled: true,
            speed: 0.1
          },
          pinch: { 
            enabled: true 
          },
          mode: "x",
          onZoomComplete: function({chart}) {
            // Prevent auto zoom out by maintaining current zoom level
            chart.update('none');
          }
        },
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          maxTicksLimit: 8,
          font: {
            size: 10
          }
        },
        grid: {
          display: true
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0.8,
        max: 5.2,
        ticks: {
          stepSize: 0.2,
          min: 1,
          max: 5,
          callback: function(value) {
            return revMoodMap[value];
          },
          font: {
            size: 11
          },
          padding: 8
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: function(context) {
            if (!context || !context.tick) return 0;
            const value = context.tick.value;
            // Only show grid lines for values 1, 2, 3, 4, 5
            if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) {
              return 1;
            }
            return 0; // Hide grid lines for other values
          }
        }
      },
    },
  };

  const handleResetZoom = () => {
    if (chartRef.current) chartRef.current.resetZoom();
  };

  if (loading) {
    return (
      <div className="chart-container" style={{ 
        height: "400px", 
        width: "100%", 
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading mood data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container" style={{ 
        height: "400px", 
        width: "100%", 
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className="text-center">
          <div className="text-lg text-red-600">{error}</div>
          <button 
            className="start-btn mt-4" 
            onClick={fetchMoods}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state if no mood data
  if (moodData.length === 0 && !loading) {
    return (
      <div className="chart-container" style={{ 
        height: "400px", 
        width: "100%", 
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <div className="text-xl text-gray-600 mb-2">No mood data yet</div>
          <div className="text-gray-500 mb-4">Start tracking your mood to see your journey!</div>
          <button 
            className="start-btn" 
            onClick={() => window.location.href = '/mindfulness'}
          >
            Track Your Mood
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container" style={{ 
      height: "400px", 
      width: "100%", 
      padding: "10px",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "10px"
      }}>
        <h2 style={{ margin: 0, fontSize: "18px" }}>
          📊 {user ? `Your Mood History` : 'Mood History'}
        </h2>
        <div>
          <button className="start-btn" onClick={fetchMoods} style={{ marginRight: 8 }}>
            🔄 Refresh
          </button>
          <button className="close-btn" onClick={handleResetZoom}>
            🔍 Reset Zoom
          </button>
        </div>
      </div>

      <div style={{ 
        height: "320px", 
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
