import React, { useState, useEffect } from "react";

const DepreciationCal = () => {
  const [year, setYear] = useState(2025);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedAssetType, setSelectedAssetType] = useState("");

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
      setSelectedAssetType(assetType);
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
    <div className="py-6 px-8 flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-blue-700 tracking-wide uppercase text-center flex-1">
          Depreciation Table
        </h2>
        <select
          className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg cursor-pointer shadow-md hover:bg-blue-700 transition duration-300"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {[2022, 2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background làm mờ bằng backdrop-filter */}
          <div className="absolute inset-0 backdrop-blur-md"></div>

          {/* Modal */}
          <div className="relative bg-white p-6 rounded-xl shadow-2xl border border-gray-300 w-3/4 max-w-4xl">
            <button
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setSelectedAsset(null)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center uppercase">
              {selectedAssetType ? selectedAssetType : "Asset Details"}
            </h3>
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="w-full border-collapse border border-blue-400">
                <thead className="bg-blue-200">
                  <tr>
                    <th className="border border-blue-400 px-4 py-2 text-center">Series</th>
                    <th className="border border-blue-400 px-4 py-2 text-center">Building</th>
                    <th className="border border-blue-400 px-4 py-2 text-center">Room</th>
                    <th className="border border-blue-400 px-4 py-2 text-center">Original Value (VNĐ)</th>
                    <th className="border border-blue-400 px-4 py-2 text-center">Current Value (VNĐ)</th>
                    <th className="border border-blue-400 px-4 py-2 text-center">Depreciation Rate (%)</th>
                    <th className="border border-blue-400 px-4 py-2 text-center">Years Used</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAsset.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.series}</td>
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.buildingName}</td>
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.roomNumber}</td>
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.originalValue.toFixed(2)}</td>
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.currentValue.toFixed(2)}</td>
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.depreciationRate}%</td>
                      <td className="border border-blue-400 px-4 py-2 text-center">{item.yearsUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setSelectedAsset(null)}
              className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepreciationCal;
