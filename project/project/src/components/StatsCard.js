import React from "react";

function StatsCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-content">
        <div className="stats-header">
          <span className="stats-icon" style={{ backgroundColor: color + "20", color: color }}>
            {icon}
          </span>
          <h4>{title}</h4>
        </div>
        <div className="stats-value">{value}</div>
        {subtitle && <div className="stats-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}

export default StatsCard;
