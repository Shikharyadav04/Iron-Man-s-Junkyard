import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/admin/${endpoint}`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Error fetching stats');
    }
  };

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [growth, retention, requestCounts, conversion, featureEffect, peakUsage, forecast, demographics] =
          await Promise.all([
            fetchData("growth-stats"),
            fetchData("retention-stats"),
            fetchData("request-counts"),
            fetchData("conversion-stats"),
            fetchData("feature-effectiveness"),
            fetchData("peak-usage-times"),
            fetchData("forecast-stats"),
            fetchData("user-demographics")
          ]);
        
        setStats({
          growthRate: growth.growthRate,
          retentionRate: retention.retentionRate,
          requestCounts: requestCounts.requestCounts,
          conversionRate: conversion.conversionRate,
          featureEffect: featureEffect.changeRate,
          peakUsage: peakUsage.usageData,
          forecast: forecast.usersPerMonth,
          demographics: demographics.locationData
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAllStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Stats Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">Growth Rate</h3>
          <p className="text-xl">{stats.growthRate}%</p>
        </div>
        
        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">Retention Rate</h3>
          <p className="text-xl">{stats.retentionRate}%</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">Request Counts</h3>
          {stats.requestCounts.map((status) => (
            <p key={status._id}>{status._id}: {status.count}</p>
          ))}
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">Conversion Rate</h3>
          <p className="text-xl">{stats.conversionRate}%</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">Feature Effectiveness</h3>
          <p className="text-xl">{stats.featureEffect}%</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">Peak Usage Times</h3>
          {stats.peakUsage.map((hour) => (
            <p key={hour._id}>Hour {hour._id}: {hour.count} requests</p>
          ))}
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">User Growth Forecast</h3>
          {stats.forecast.map((month) => (
            <p key={month._id}>Month {month._id}: {month.count} users</p>
          ))}
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-bold">User Demographics</h3>
          {stats.demographics.map((loc) => (
            <p key={loc._id}>{loc._id}: {loc.count} users</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
