import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/leads", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setLeads(data.leads || []));

    fetch("/api/leads/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const initials = user?.email?.slice(0, 2).toUpperCase();

  function getBadgeClass(status) {
    return `badge badge-${status}`;
  }

  return (
    <div className="db">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-icon">🏢</div>
          <span className="nav-name">CRM Platform</span>
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar">{initials}</div>
            <span className="nav-email">{user?.email}</span>
          </div>
          <span className="nav-role">{user?.role}</span>
          <button className="nav-logout" onClick={logout}>Sign out</button>
        </div>
      </nav>

      <div className="main">
        <p className="page-title">Dashboard</p>
        <p className="page-sub">Welcome back, here's what's happening today.</p>

        <div className="stats">
          <div className="stat-card accent">
            <div className="stat-label">Total leads</div>
            <div className="stat-val">{stats?.total || 0}</div>
            <div className="stat-sub">All time</div>
          </div>
          {["new", "contacted", "converted"].map(s => (
            <div key={s} className="stat-card">
              <div className="stat-label">{s}</div>
              <div className="stat-val">
                {stats?.byStatus?.find(r => r.status === s)?.total || 0}
              </div>
              <div className="stat-sub">
                {s === "new" ? "Awaiting contact" : s === "contacted" ? "In progress" : "Closed deals"}
              </div>
            </div>
          ))}
        </div>

        <div className="table-card">
          <div className="table-header">
            <span className="table-title">Recent leads</span>
            <Link to="/admin-demo" className="demo-btn">Admin demo view →</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td><span className={getBadgeClass(lead.status)}>{lead.status}</span></td>
                  <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}