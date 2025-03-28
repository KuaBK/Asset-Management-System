import React, { useState, useEffect } from "react";

const DepreciationCal = () => {
  const [year, setYear] = useState(2025);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset/summary?year=${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAssets(data.result);
      } catch (error) {
        console.error("Error fetching asset details:", error);
      }
    };

    fetchAssets();
  }, [year, token]);

  const fetchAssetDetail = async (assetType) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/asset/detail/byAssetType?year=${year}&assetType=${assetType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedAsset(data.result);
    } catch (error) {
      console.error("Error fetching asset detail:", error);
    }
  };

  return (
    <div className="py-4 px-6 lg:px-8 flex flex-col items-center">
      <div className="mt-4 flex items-center justify-center space-x-4">
        <h2 className="text-xl font-bold bg-blue-500 text-white py-2 px-6 rounded-lg">
          DEPRECIATION TABLE
        </h2>
        <select
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div className="mt-10 w-full max-w-7xl overflow-x-auto">
        <table className="min-w-full border-collapse border border-blue-400">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-blue-400 px-4 py-2 text-center">Asset Type</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Total Count</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Original Value (VNĐ)</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Current Value (VNĐ)</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Depreciation Rate (%)</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-blue-100">
                <td className="border border-blue-400 px-4 py-2 text-center">{item.assetType}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.totalCount}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.totalOriginalValue.toFixed(2)}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.totalCurrentValue.toFixed(2)}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">
                  {item.totalOriginalValue > 0
                    ? ((1 - item.totalCurrentValue / item.totalOriginalValue) * 100).toFixed(2)
                    : "N/A"}
                </td>
                <td className="border border-blue-400 px-4 py-2 text-center">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => fetchAssetDetail(item.assetType)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl opacity-100 transition-opacity duration-300">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center uppercase">
              Asset Details
            </h3>
            <table className="min-w-full border-collapse border border-blue-400">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-blue-400 px-6 py-3 text-center">Series</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Building</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Room</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Original Value (VNĐ)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Current Value (VNĐ)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Depreciation Rate (%)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Years Used</th>
                </tr>
              </thead>
              <tbody>
                {selectedAsset.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.series}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.buildingName}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.roomNumber}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.originalValue.toFixed(2)}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.currentValue.toFixed(2)}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.depreciationRate}%</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.yearsUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setSelectedAsset(null)} className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepreciationCal;
