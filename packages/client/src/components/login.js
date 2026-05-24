import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Login failed");
    login(data.accessToken);
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <div className="login-brand">
            <div className="login-brand-icon">🏢</div>
            <span className="login-brand-name">CRM Platform</span>
          </div>
          <div>
            <h2 className="login-left-title">Manage your leads, close more deals</h2>
            <p className="login-left-sub">A secure, role-based CRM built for modern sales teams.</p>
          </div>
          <div className="login-stats">
            {[
              { label: "Role-based access", sub: "Admins, managers, agents" },
              { label: "JWT secured", sub: "Every route protected" },
              { label: "Live dashboard", sub: "Real-time lead tracking" }
            ].map((item, i) => (
              <div key={i} className="login-stat">
                <div className="login-stat-icon">✦</div>
                <div>
                  <div className="login-stat-val">{item.label}</div>
                  <div className="login-stat-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="login-right">
          <span className="login-badge">🔒 Secure sign in</span>
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Enter your credentials to access your dashboard</p>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label">Email address</label>
              <input className="login-input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="login-field">
              <label className="login-label">Password</label>
              <input className="login-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="login-btn">Sign in →</button>
          </form>

          <hr className="login-divider" />
          <p className="login-footer">CRM Platform · All rights reserved</p>
        </div>

      </div>
    </div>
  );
}