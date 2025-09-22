// client/src/components/PeriodForm.js
import React, { useState, useEffect } from 'react';

const PeriodForm = ({ selectedDate, editingPeriod, onSubmit, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    mood: 'normal',
    notes: '',
    date: ''
  });

  const moodOptions = [
    'happy', 'sad', 'anxious', 'irritated', 'normal', 'energetic'
  ];

  useEffect(() => {
    if (editingPeriod) {
      setFormData({
        mood: editingPeriod.mood || 'normal',
        notes: editingPeriod.notes || '',
        date: editingPeriod.startDate ? new Date(editingPeriod.startDate).toISOString().split('T')[0] : ''
      });
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate.toISOString().split('T')[0]
      }));
    }
  }, [editingPeriod, selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date) {
      alert('Please select a date');
      return;
    }

    // Convert back to period format for backend compatibility
    const periodData = {
      startDate: formData.date,
      mood: formData.mood,
      notes: formData.notes,
      // Keep minimal required fields for backend
      flow: 'medium',
      symptoms: [],
      cycleLength: 28
    };

    onSubmit(periodData);
  };

  const formatMoodName = (mood) => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };

  return (
    <div className="period-form-overlay">
      <div className="period-form">
        <div className="form-header">
          <h3>{editingPeriod ? 'Edit Mood & Notes' : 'Log Mood & Notes'}</h3>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>Date</h4>
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h4>Mood</h4>
            <div className="mood-options">
              {moodOptions.map(mood => (
                <label key={mood} className="mood-option">
                  <input
                    type="radio"
                    name="mood"
                    value={mood}
                    checked={formData.mood === mood}
                    onChange={handleInputChange}
                  />
                  <span className={`mood-indicator ${mood}`}></span>
                  {formatMoodName(mood)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h4>Notes</h4>
            <div className="form-group">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional notes about this period..."
                rows="3"
                maxLength="500"
              />
              <small>{formData.notes.length}/500 characters</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            {onDelete && (
              <button 
                type="button" 
                className="delete-btn" 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this period entry?')) {
                    onDelete();
                    onCancel();
                  }
                }}
              >
                Delete
              </button>
            )}
            <button type="submit" className="submit-btn">
              {editingPeriod ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PeriodForm;
