// client/src/components/PeriodStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeriodStats = ({ periods }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [periods]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/periods/stats');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching period stats:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMoodBasedTips = (lastPeriod) => {
    if (!lastPeriod || !lastPeriod.mood) return [];
    
    const tips = {
      'happy': [
        '🌟 Great mood! Keep up the positive energy with light exercise and social activities.',
        '💧 Stay hydrated and maintain your happy vibes with nutritious meals.'
      ],
      'sad': [
        '🤗 Feeling down is normal. Try gentle activities like reading or listening to music.',
        '☕ Consider warm drinks and comfort foods in moderation to lift your spirits.'
      ],
      'anxious': [
        '🧘 Try deep breathing exercises or meditation to calm your mind.',
        '🚶 Light walks or yoga can help reduce anxiety and stress levels.'
      ],
      'irritated': [
        '😌 Take some time for yourself. Avoid stressful situations when possible.',
        '🛁 A warm bath or relaxing activities might help soothe your mood.'
      ],
      'normal': [
        '✨ Balanced mood is great! Maintain your routine and stay consistent.',
        '🥗 Focus on balanced nutrition and regular sleep patterns.'
      ],
      'energetic': [
        '⚡ Channel that energy into productive activities or exercise!',
        '🏃 Great time for workouts, but don\'t forget to rest when needed.'
      ]
    };
    
    return tips[lastPeriod.mood] || tips['normal'];
  };

  if (loading) {
    return <div className="stats-loading">Loading statistics...</div>;
  }

  if (!stats || stats.totalPeriods === 0) {
    return (
      <div className="period-stats">
        <h3>Last Period</h3>
        <div className="no-data">
          <p>No period data available yet.</p>
          <p>Start logging your periods to see your last period and get personalized tips!</p>
        </div>
      </div>
    );
  }

  const lastPeriod = periods && periods.length > 0 ? periods[0] : null;
  const moodTips = getMoodBasedTips(lastPeriod);

  return (
    <div className="period-stats">
      <h3>Last Period</h3>
      
      <div className="stats-grid">
        <div className="stat-card last-period">
          <div className="stat-header">
            <h4>Last Period</h4>
          </div>
          <div className="stat-content">
            <div className="last-period-date">
              {formatDate(stats.lastPeriodDate)}
            </div>
            <div className="days-ago">
              {(() => {
                const today = new Date();
                const lastDate = new Date(stats.lastPeriodDate);
                const diffTime = today - lastDate;
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
              })()}
            </div>
            {lastPeriod && lastPeriod.mood && (
              <div className="last-mood">
                <span className="mood-label">Mood: </span>
                <span className={`mood-indicator ${lastPeriod.mood}`}></span>
                <span className="mood-text">{lastPeriod.mood.charAt(0).toUpperCase() + lastPeriod.mood.slice(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cycle-tips">
        <h4>💡 Mood-Based Tips</h4>
        <div className="tips-content">
          {moodTips.map((tip, index) => (
            <div key={index} className="tip">
              <span>{tip}</span>
            </div>
          ))}
          {!lastPeriod || !lastPeriod.mood && (
            <div className="tip">
              <span className="tip-icon">📝</span>
              <span>Log your mood to get personalized tips based on how you're feeling!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeriodStats;
