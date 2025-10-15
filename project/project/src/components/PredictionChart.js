import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

function PredictionChart({ prediction }) {
  if (!prediction) return null;

  const data = Object.entries(prediction).map(([key, value]) => ({
    name: key.replace(/\s*\(.*?\)\s*/g, ""),
    value: parseFloat(value),
    unit: key.match(/\((.*?)\)/)?.[1] || ""
  }));

  const COLORS = ["#667eea", "#764ba2", "#f093fb"];

  return (
    <div className="chart-container">
      <h3>Material Requirements Visualization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#666", fontSize: 12 }}
            angle={-15}
            textAnchor="end"
            height={70}
          />
          <YAxis tick={{ fill: "#666", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
            formatter={(value, name, props) => [
              `${value} ${props.payload.unit}`,
              props.payload.name
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="value" name="Quantity" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionChart;
