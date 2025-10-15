import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        onLogin({ username, role: "admin" });
      } else if (username === "user" && password === "user123") {
        onLogin({ username, role: "user" });
      } else {
        setError("Invalid credentials. Try admin/admin123 or user/user123");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-circle">
            <span className="logo-icon">⚡</span>
          </div>
          <h2>POWERGRID Portal</h2>
          <p className="login-subtitle">Material Demand Forecasting System</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <span className="input-icon">👤</span>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>
              <span className="input-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        <div className="login-footer">
          <p>Demo Credentials:</p>
          <div className="credentials-box">
            <span>admin / admin123</span>
            <span>user / user123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
