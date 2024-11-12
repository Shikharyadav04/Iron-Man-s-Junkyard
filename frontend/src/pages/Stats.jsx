import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/stats');
        setStats(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching stats');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Stats</h2>

      <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card p-4 bg-white shadow rounded">
          <h3 className="font-bold">Users Registered This Month</h3>
          <p className="text-xl">{stats.usersThisMonth}</p>
        </div>

        <div className="stat-card p-4 bg-white shadow rounded">
          <h3 className="font-bold">Active Users This Month</h3>
          <p className="text-xl">{stats.activeUsers}</p>
        </div>

        <div className="stat-card p-4 bg-white shadow rounded">
          <h3 className="font-bold">Request Status Counts</h3>
          {stats.requestCounts.map((status) => (
            <p key={status._id}>
              {status._id}: {status.count}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
