// client/src/components/PeriodTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PeriodForm from './PeriodForm';
import PeriodStats from './PeriodStats';

const PeriodTracker = () => {
  const [periods, setPeriods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchPeriods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mindfulness/periods');
      setPeriods(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching periods:', error);
      setLoading(false);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    
    // Check if there's already a mood/notes entry on this date
    const existingEntry = periods.find(period => {
      const entryDate = new Date(period.startDate);
      return date.toDateString() === entryDate.toDateString();
    });

    if (existingEntry) {
      setEditingPeriod(existingEntry);
    } else {
      setEditingPeriod(null);
    }
    
    setShowForm(true);
  };

  const handleFormSubmit = async (periodData) => {
    try {
      if (editingPeriod) {
        await axios.put(`http://localhost:5000/api/mindfulness/periods/${editingPeriod._id}`, periodData);
      } else {
        await axios.post('http://localhost:5000/api/mindfulness/periods', periodData);
      }
      
      fetchPeriods();
      setShowForm(false);
      setEditingPeriod(null);
      setSelectedDate(null);
    } catch (error) {
      console.error('Error saving period:', error);
    }
  };

  const handleDeletePeriod = async (periodId) => {
    if (window.confirm('Are you sure you want to delete this period entry?')) {
      try {
        await axios.delete(`http://localhost:5000/api/mindfulness/periods/${periodId}`);
        fetchPeriods();
      } catch (error) {
        console.error('Error deleting period:', error);
      }
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const getEntryForDate = (date) => {
      return periods.find(period => {
        const entryDate = new Date(period.startDate);
        return date.toDateString() === entryDate.toDateString();
      });
    };

    return (
      <div className="period-calendar">
        <div className="calendar-header">
          <button 
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="nav-button"
          >
            ←
          </button>
          <h3>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
          <button 
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="nav-button"
          >
            →
          </button>
        </div>
        
        <div className="calendar-grid">
          <div className="weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="days">
            {days.map((date, index) => {
              const entry = getEntryForDate(date);
              const isCurrentMonth = date.getMonth() === month;
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} 
                    ${isToday ? 'today' : ''} 
                    ${entry ? 'entry-day' : ''}`}
                  onClick={() => isCurrentMonth && handleDateClick(date)}
                >
                  <span className="day-number">{date.getDate()}</span>
                  {entry && entry.mood && (
                    <div className="mood-indicator">
                      <div className={`mood-dot ${entry.mood}`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading period data...</div>;
  }

  return (
    <div className="period-tracker">
      <div className="period-tracker-header">
        <h2>Period Tracker</h2>
        <button 
          className="add-period-btn"
          onClick={() => {
            setSelectedDate(new Date());
            setEditingPeriod(null);
            setShowForm(true);
          }}
        >
          Log Mood & Notes
        </button>
      </div>

      <div className="period-content">
        <div className="calendar-section">
          {renderCalendar()}
          
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color entry-day"></div>
              <span>Days with Mood/Notes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color today"></div>
              <span>Today</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <PeriodStats periods={periods} />
        </div>
      </div>

      {showForm && (
        <PeriodForm
          selectedDate={selectedDate}
          editingPeriod={editingPeriod}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPeriod(null);
            setSelectedDate(null);
          }}
          onDelete={editingPeriod ? () => handleDeletePeriod(editingPeriod._id) : null}
        />
      )}

    </div>
  );
};

export default PeriodTracker;
