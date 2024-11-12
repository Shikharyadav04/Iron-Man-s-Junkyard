import React, { useEffect, useState } from "react";
import axios from "axios";

const StatsComponent = () => {
  const [growthStats, setGrowthStats] = useState(null);
  const [retentionStats, setRetentionStats] = useState(null);
  const [requestCounts, setRequestCounts] = useState(null);
  const [conversionStats, setConversionStats] = useState(null);
  const [featureEffectiveness, setFeatureEffectiveness] = useState(null);
  const [peakUsageTimes, setPeakUsageTimes] = useState(null);
  const [forecastStats, setForecastStats] = useState(null);
  const [userDemographics, setUserDemographics] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const growthResponse = await axios.get("/api/v1/adminStats/growth-stats");
        setGrowthStats(growthResponse.data);

        const retentionResponse = await axios.get("http://localhost:8000/api/v1/adminStats/retention-stats");
        setRetentionStats(retentionResponse.data);

        const requestCountsResponse = await axios.get("http://localhost:8000/api/v1/adminStats/request-counts");
        setRequestCounts(requestCountsResponse.data);

        const conversionResponse = await axios.get("http://localhost:8000/api/v1/adminStats/conversion-stats");
        setConversionStats(conversionResponse.data);

        const featureEffectivenessResponse = await axios.get("http://localhost:8000/api/v1/adminStats/feature-effectiveness");
        setFeatureEffectiveness(featureEffectivenessResponse.data);

        const peakUsageResponse = await axios.get("http://localhost:8000/api/v1/adminStats/peak-usage-times");
        setPeakUsageTimes(peakUsageResponse.data);

        const forecastResponse = await axios.get("http://localhost:8000/api/v1/adminStats/forecast-stats");
        setForecastStats(forecastResponse.data);

        const demographicsResponse = await axios.get("http://localhost:8000/api/v1/adminStats/user-demographics");
        setUserDemographics(demographicsResponse.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Growth Rate</h2>
          {growthStats ? (
            <p className="text-lg font-bold text-blue-500">Growth Rate: {growthStats.growthRate}%</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Retention Rate</h2>
          {retentionStats ? (
            <p className="text-lg font-bold text-green-500">Retention Rate: {retentionStats.retentionRate}%</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Request Counts</h2>
          {requestCounts ? (
            requestCounts.requestCounts.map((item) => (
              <p key={item._id} className="text-gray-600">
                {item._id}: <span className="font-semibold">{item.count}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Conversion Rate</h2>
          {conversionStats ? (
            <p className="text-lg font-bold text-purple-500">Conversion Rate: {conversionStats.conversionRate}%</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Feature Effectiveness</h2>
          {featureEffectiveness ? (
            <p className="text-lg font-bold text-orange-500">Change Rate: {featureEffectiveness.changeRate}%</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Peak Usage Times</h2>
          {peakUsageTimes ? (
            peakUsageTimes.usageData.map((item) => (
              <p key={item._id} className="text-gray-600">
                Hour: {item._id}, Count: {item.count}
              </p>
            ))
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Forecasting</h2>
          {forecastStats ? (
            forecastStats.usersPerMonth.map((item) => (
              <p key={item._id} className="text-gray-600">
                Month: {item._id}, New Users: {item.count}
              </p>
            ))
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">User Demographics</h2>
          {userDemographics ? (
            userDemographics.locationData.map((item) => (
              <p key={item._id} className="text-gray-600">
                Location: {item._id}, Count: {item.count}
              </p>
            ))
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
