import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <div>
      <h1>CRM Dashboard</h1>
      <p>Logged in as: {user?.email} ({user?.role})</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/admin-demo">Switch to Admin Demo</Link>
    </div>
);
}