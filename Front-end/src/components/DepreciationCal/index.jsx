import React, { useState, useEffect } from "react";

const DepreciationCal = () => {
  const [year, setYear] = useState(2025);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const token = localStorage.getItem("TOKEN");

  // Fetch tổng hợp tài sản theo năm
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset/summary?year=${year}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching asset summary:", error);
      }
    };

    fetchAssets();
  }, [year, token]);

  // Fetch chi tiết tài sản
  const fetchAssetDetail = async (assetType) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/asset/detail/byAssetType?year=${year}&assetType=${assetType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedAsset(data);
    } catch (error) {
      console.error("Error fetching asset detail:", error);
    }
  };

  return (
    <div className="py-4 px-6 lg:px-8 flex flex-col items-center">
      {/* Tiêu đề & chọn năm */}
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

      {/* Bảng tài sản */}
      <div className="mt-10 w-full max-w-7xl overflow-x-auto">
        <table className="min-w-full border-collapse border border-blue-400">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-blue-400 px-4 py-2 text-center">Type</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Brand</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Quantity</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Total Original Value (VNĐ)</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Total Residual Value (VNĐ)</th>
              <th className="border border-blue-400 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-blue-100">
                <td className="border border-blue-400 px-4 py-2 text-center">{item.type}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.brand}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.quantity}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.total_original_value.toFixed(2)}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.total_residual_value.toFixed(2)}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">
                  <button
                    onClick={() => fetchAssetDetail(item.type)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết tài sản */}
      {selectedAsset && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center uppercase">
              {selectedAsset.type} Details
            </h3>

            <table className="min-w-full border-collapse border border-blue-400">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-blue-400 px-6 py-3 text-center">Model</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Material</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Depreciation Rate (%)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Estimated Life (Years)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Residual Value (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {selectedAsset.details.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.model}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.material}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.depreciation_rate * 100}%</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.estimated_life}</td>
                    <td className="border border-blue-400 px-6 py-3 text-center">{item.residual_value.toFixed(2)}</td>
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
