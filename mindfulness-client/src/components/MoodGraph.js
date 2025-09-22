// client/src/components/MoodGraph.js
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { getMoodHistory, cleanupMoodData } from "../services/api";
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
const revMoodMap = {
  5: "😊 Happy",
  4: "😌 Calm",
  3: "😴 Tired",
  2: "😢 Sad",
  1: "😡 Angry",
};

export default function MoodGraph() {
  const [moodData, setMoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const chartRef = useRef(null);
  const mountedRef = useRef(true);
  const intervalRef = useRef(null);

  const fetchMoods = async (isManualRefresh = false) => {
    if (!mountedRef.current) return;
    
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else if (!hasInitialLoad) {
        setIsLoading(true);
      }
      
      const res = await getMoodHistory();
      let newData = res.data || [];
      
      // Filter out future dates and invalid data - be very strict
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      newData = newData.filter(item => {
        const itemDate = new Date(item.createdAt);
        const itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
        
        // Only allow data from today or earlier, and valid moods
        return itemDay <= today && 
               item.mood && 
               ['Happy', 'Calm', 'Tired', 'Sad', 'Angry'].includes(item.mood) &&
               itemDate.getFullYear() <= now.getFullYear();
      });
      
      console.log("📊 Filtered mood data:", newData);

      if (mountedRef.current && chartRef.current && newData.length > 0) {
        const chart = chartRef.current;
        const newLabels = newData.map((d) =>
          new Date(d.createdAt || Date.now()).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short",
          })
        );
        const newDataPoints = newData.map((d) => moodMap[d.mood] || 0);
        
        // Only update if data has actually changed
        const currentLabels = chart.data.labels || [];
        const currentData = chart.data.datasets[0].data || [];
        
        if (JSON.stringify(newLabels) !== JSON.stringify(currentLabels) || 
            JSON.stringify(newDataPoints) !== JSON.stringify(currentData)) {
          chart.data.labels = newLabels;
          chart.data.datasets[0].data = newDataPoints;
          chart.update("none");
        }
      }
      
      if (mountedRef.current) {
        setMoodData(newData);
        setIsLoading(false);
        setIsRefreshing(false);
        setHasInitialLoad(true);
      }
    } catch (err) {
      console.error("❌ Error fetching moods:", err);
      if (mountedRef.current) {
        // Don't show fake data, just set empty
        setMoodData([]);
        setIsLoading(false);
        setIsRefreshing(false);
        setHasInitialLoad(true);
      }
    }
  };

  useEffect(() => {
    // Clean database first, then load data
    const initializeData = async () => {
      try {
        // Clean up invalid data first
        await cleanupMoodData();
        console.log('🧹 Database cleaned');
        
        // Then fetch clean data
        await fetchMoods();
      } catch (error) {
        console.log('Cleanup failed, loading data anyway:', error);
        fetchMoods();
      }
    };
    
    initializeData();
    
    // Disable automatic refresh to prevent flickering
    // intervalRef.current = setInterval(fetchMoods, 30000);
    
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (e) {
          console.log('Chart cleanup error (safe to ignore):', e.message);
        }
      }
    };
  }, []);

  useEffect(() => {
    const handler = () => fetchMoods();
    window.addEventListener("moodSaved", handler);
    return () => window.removeEventListener("moodSaved", handler);
  }, []);

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
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 300,
    },
    layout: {
      padding: { left: 15, right: 15, top: 15, bottom: 15 },
    },
    plugins: {
      legend: { 
        display: true, 
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: '500'
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#38bdf8',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context) => {
            return `Time: ${context[0].label}`;
          },
          label: (ctx) => {
            const moodText = revMoodMap[ctx.parsed.y] || ctx.parsed.y;
            return `Mood: ${moodText}`;
          },
        },
      },
      zoom: {
        limits: {
          y: { min: 0.5, max: 5.5 },
          x: { min: "original", max: "original" },
        },
        pan: { 
          enabled: true, 
          mode: "x", 
          threshold: 10,
          modifierKey: null,
        },
        zoom: {
          wheel: { 
            enabled: true, 
            speed: 0.1,
            modifierKey: null,
          },
          pinch: { enabled: true },
          drag: {
            enabled: true,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderColor: '#38bdf8',
            borderWidth: 1,
          },
          mode: "x",
          onZoomComplete: ({ chart }) => {
            chart.update("none");
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14,
            weight: '500'
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          maxTicksLimit: 6,
          font: { size: 11 },
          color: '#6b7280'
        },
        grid: { 
          display: true,
          color: 'rgba(107, 114, 128, 0.1)'
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0.5,
        max: 5.5,
        title: {
          display: true,
          text: 'Mood Level',
          font: {
            size: 14,
            weight: '500'
          }
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            const intValue = Math.round(value);
            if (intValue >= 1 && intValue <= 5) {
              return revMoodMap[intValue];
            }
            return '';
          },
          font: {
            size: 12
          },
          color: '#6b7280',
          padding: 10
        },
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.1)',
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: (ctx) => {
            const v = Math.round(ctx?.tick?.value);
            return v >= 1 && v <= 5 ? 1 : 0;
          },
        },
      },
    },
  };

  const handleResetZoom = () => {
    if (chartRef.current) chartRef.current.resetZoom();
  };

  // Don't render anything if no data
  if (moodData.length === 0) {
    return null;
  }

  return (
    <div style={{ 
      height: "400px", 
      width: "100%",
      margin: "20px 0"
    }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
