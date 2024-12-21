import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsComponent from '@/components/StatsComponent';

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

  if (loading) return <p className="text-center text-lg font-bold text-gray-950 animate-pulse">Loading...</p>;
  if (error) return <p className="text-center text-black font-semibold">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen bg-[url(https://img.freepik.com/premium-vector/bar-chart-with-pie-chart-overlay-research-statistical-data-company-performance-indicators-simple-minimalist-flat-vector-illustration_538213-118982.jpg)] bg-fill">
      <h2 className="font-bold text-gray-950 mb-8 text-center">Admin Stats Dashboard</h2>

      <div className="stats-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105">
          <h3 className="font-bold text-gray-950 text-lg mb-2">Users Registered This Month</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.usersThisMonth}</p>
        </div>

        <div className="stat-card p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105">
          <h3 className="font-bold text-gray-950 text-lg mb-2">Active Users This Month</h3>
          <p className="text-2xl font-bold text-green-500">{stats.activeUsers}</p>
        </div>

        <div className="stat-card p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105">
          <h3 className="font-bold text-gray-950 text-lg mb-2">Request Status Counts</h3>
          {stats.requestCounts.map((status) => (
            <p key={status._id} className="text-gray-600">
              {status._id}: <span className="font-semibold">{status.count}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <StatsComponent />
      </div>
    </div>
  );
};

export default Stats;
