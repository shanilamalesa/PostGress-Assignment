import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function AdminDemo() {
  const { token, user } = useAuth();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/api/leads", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => setLeads(data.leads));
}, []);

  return (
    <div>
        <h2>Viewing as: {user?.role}</h2>
        {leads.map(lead => (
            <div key={lead.id}>
                <p>{lead.name} - {lead.email} - {lead.status}</p>
            </div>
        ))}
    </div>
);
}