import React, { useState, useEffect } from "react";
import PredictionChart from "./PredictionChart";
import StatsCard from "./StatsCard";
import LoadingSpinner from "./LoadingSpinner";

function Dashboard({ user, onLogout }) {
  const [formData, setFormData] = useState({
    budget: "",
    location: "",
    tower_type: "",
    substation_type: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [stats, setStats] = useState({ totalPredictions: 0, avgBudget: 0, lastPrediction: null });

  useEffect(() => {
    const savedHistory = localStorage.getItem("prediction_history");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistory(parsedHistory);
      calculateStats(parsedHistory);
    }
  }, []);

  const calculateStats = (historyData) => {
    if (historyData.length === 0) return;

    const totalBudget = historyData.reduce((sum, entry) => sum + parseFloat(entry.inputs.budget), 0);
    const avgBudget = (totalBudget / historyData.length).toFixed(2);
    const lastPrediction = historyData[0];

    setStats({
      totalPredictions: historyData.length,
      avgBudget,
      lastPrediction
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.budget || !formData.location || !formData.tower_type || !formData.substation_type) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setPrediction(null);
    setLoading(true);

    try {
      const response = await fetch("https://your-python-api.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: parseFloat(formData.budget),
          location: formData.location,
          tower_type: formData.tower_type,
          substation_type: formData.substation_type,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        setPrediction(data);
        const newEntry = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          inputs: formData,
          results: data
        };
        const updatedHistory = [newEntry, ...history].slice(0, 10);
        setHistory(updatedHistory);
        calculateStats(updatedHistory);
        localStorage.setItem("prediction_history", JSON.stringify(updatedHistory));
      } else {
        setError("No prediction data received from API");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(`Failed to get prediction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!prediction) return;

    const content = `
POWERGRID Material Forecast Report
Generated: ${new Date().toLocaleString()}
User: ${user?.username}

Project Parameters:
- Budget: ${formData.budget} Cr
- Location: ${formData.location}
- Tower Type: ${formData.tower_type}
- Substation Type: ${formData.substation_type}

Predicted Materials:
${Object.entries(prediction).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `powergrid-forecast-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all prediction history?")) {
      setHistory([]);
      setStats({ totalPredictions: 0, avgBudget: 0, lastPrediction: null });
      localStorage.removeItem("prediction_history");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="header">
          <div>
            <h2>POWERGRID Forecasting</h2>
            <p className="header-subtitle">Material Demand Prediction System</p>
          </div>
          <div className="user-info">
            <div className="user-badge">
              <span className="user-icon">👤</span>
              <span className="user-name">{user?.username}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <StatsCard
            title="Total Predictions"
            value={stats.totalPredictions}
            subtitle="Lifetime forecasts"
            icon="📊"
            color="#3b82f6"
          />
          <StatsCard
            title="Avg Budget"
            value={`₹${stats.avgBudget} Cr`}
            subtitle="Per project"
            icon="💰"
            color="#10b981"
          />
          <StatsCard
            title="Last Prediction"
            value={stats.lastPrediction ? new Date(stats.lastPrediction.timestamp).toLocaleDateString() : "N/A"}
            subtitle={stats.lastPrediction ? new Date(stats.lastPrediction.timestamp).toLocaleTimeString() : "No data"}
            icon="🕐"
            color="#f59e0b"
          />
        </div>

        <div className="tabs">
          <button
            className={!showHistory ? "tab-active" : ""}
            onClick={() => setShowHistory(false)}
          >
            <span className="tab-icon">🔮</span>
            New Prediction
          </button>
          <button
            className={showHistory ? "tab-active" : ""}
            onClick={() => setShowHistory(true)}
          >
            <span className="tab-icon">📜</span>
            History ({history.length})
          </button>
        </div>

        {!showHistory ? (
          <div className="prediction-section">
            <form onSubmit={handleSubmit} className="prediction-form">
              <div className="form-row">
                <div className="form-group">
                  <label>💵 Budget (Crores)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter budget in crores"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>📍 Location</label>
                  <select name="location" value={formData.location} onChange={handleChange} required>
                    <option value="">Select location</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>🗼 Tower Type</label>
                  <select name="tower_type" value={formData.tower_type} onChange={handleChange} required>
                    <option value="">Select tower type</option>
                    <option value="132kV">132kV</option>
                    <option value="220kV">220kV</option>
                    <option value="400kV">400kV</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>⚙️ Substation Type</label>
                  <select name="substation_type" value={formData.substation_type} onChange={handleChange} required>
                    <option value="">Select substation type</option>
                    <option value="AIS">AIS (Air Insulated Switchgear)</option>
                    <option value="GIS">GIS (Gas Insulated Switchgear)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="predict-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Predicting...
                  </>
                ) : (
                  <>
                    🎯 Predict Materials
                  </>
                )}
              </button>
            </form>

            {loading && <LoadingSpinner />}

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {prediction && !loading && (
              <div className="results-section">
                <div className="results-header">
                  <h3>📊 Prediction Results</h3>
                  <button onClick={exportData} className="export-btn">
                    📥 Export
                  </button>
                </div>

                <div className="prediction-result">
                  <table>
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(prediction).map(([key, value], index) => (
                        <tr key={key} className="table-row-animated" style={{ animationDelay: `${index * 0.1}s` }}>
                          <td className="material-name">
                            <span className="material-icon">
                              {key.toLowerCase().includes("steel") ? "🔩" :
                               key.toLowerCase().includes("cement") ? "🏗️" :
                               key.toLowerCase().includes("conductor") ? "⚡" :
                               key.toLowerCase().includes("cable") ? "🔌" : "📦"}
                            </span>
                            {key}
                          </td>
                          <td className="material-value">{value}</td>
                          <td>
                            <span className="status-badge">✓ Calculated</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <PredictionChart prediction={prediction} />
              </div>
            )}
          </div>
        ) : (
          <div className="history-section">
            <div className="history-header">
              <h3>📜 Prediction History</h3>
              {history.length > 0 && (
                <button onClick={clearHistory} className="clear-btn">
                  🗑️ Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <h4>No predictions yet</h4>
                <p>Create your first prediction to see it here!</p>
                <button onClick={() => setShowHistory(false)} className="cta-btn">
                  Create Prediction
                </button>
              </div>
            ) : (
              <div className="history-container">
                {history.map((entry, index) => (
                  <div key={entry.id} className="history-entry" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="history-header-row">
                      <span className="entry-number">#{history.length - index}</span>
                      <span className="timestamp">🕐 {entry.timestamp}</span>
                    </div>
                    <div className="history-details">
                      <div className="history-inputs">
                        <h4>📋 Input Parameters</h4>
                        <div className="param-grid">
                          <div className="param-item">
                            <span className="param-label">Budget:</span>
                            <span className="param-value">₹{entry.inputs.budget} Cr</span>
                          </div>
                          <div className="param-item">
                            <span className="param-label">Location:</span>
                            <span className="param-value">{entry.inputs.location}</span>
                          </div>
                          <div className="param-item">
                            <span className="param-label">Tower:</span>
                            <span className="param-value">{entry.inputs.tower_type}</span>
                          </div>
                          <div className="param-item">
                            <span className="param-label">Substation:</span>
                            <span className="param-value">{entry.inputs.substation_type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="history-results">
                        <h4>📊 Results</h4>
                        <div className="results-grid">
                          {Object.entries(entry.results).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="result-item">
                              <span className="result-icon">
                                {key.toLowerCase().includes("steel") ? "🔩" :
                                 key.toLowerCase().includes("cement") ? "🏗️" : "⚡"}
                              </span>
                              <div>
                                <div className="result-label">{key.split(" ").slice(0, 2).join(" ")}</div>
                                <div className="result-value">{value}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
