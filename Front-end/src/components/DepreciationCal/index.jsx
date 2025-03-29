import React, { useState, useEffect } from "react";

const DepreciationCal = () => {
  const [year, setYear] = useState(2025);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const token = localStorage.getItem("TOKEN");

  const roomOptions = {
    "0": ["0"],
    "1": ["1101", "1102", "1103", "1402"],
    "2": ["2205", "2102", "2211", "2403"],
    "3": ["3301", "3503", "3107", "3201"],
    "4": ["6101", "6203", "6508", "6605"],
  };

  const getFormattedRoomName = (buildingId, roomNumber) => {
    if (buildingId === "0") return "ALL";
    return `H${buildingId}-${roomNumber.slice(1)}`;
  };

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

  const handleCheckAssets = async () => {
    if (!email.trim()) {
      alert("Please enter an email address.");
      return;
    }
    setLoading(true); // Bắt đầu loading
    try {
      const response = await fetch(
        `http://localhost:8080/api/report/check?email=${email}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to check assets");

      alert("Asset check report has been sent to your email.");
    } catch (error) {
      console.error("Error checking assets:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleGetReportByEmail = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    setLoading(true); // Bắt đầu loading
    try {
      const response = await fetch(
        `http://localhost:8080/api/report/send?buildingId=${building}&roomId=${room}&assetType=${type}&email=${email}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to send report");
      alert("Report has been sent to " + email);
    } catch (error) {
      console.error("Error sending report:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/report/export-excel?buildingId=${building}&roomId=${room}&assetType=${type}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to get download link");

      const link = await response.text(); // API returns the direct link
      setDownloadLink(link);
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error fetching download link:", error);
      alert("An error occurred while retrieving the download link!");
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

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => {
            setEmail("");
            setBuilding("");
            setRoom("");
            setType("");
            setShowModalCheck(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Check Assets
        </button>
        <button
          onClick={() => {
            setEmail("");
            setBuilding("");
            setRoom("");
            setType("");
            setShowModalEmail(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Get Report by Email
        </button>
        <button
          onClick={() => {
            setEmail("");
            setBuilding("");
            setRoom("");
            setType("");
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download Excel Report
        </button>
      </div>

      {showModalCheck && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-md"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-300 w-full max-w-xl">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setShowModalCheck(false)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center uppercase">
              Get Check Assets by Email
            </h3>
            <div className="space-y-4">
              <input
                type="email"
                className="border px-4 py-3 rounded-lg w-full"
                placeholder="Enter email for report"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-gray-600 text-sm">
                You will receive 3 Excel files:
                <br /> 1. List of assets with current value &lt; 30%
                <br /> 2. List of assets past estimated lifespan but still have value
                <br /> 3. List of assets past estimated lifespan with &lt; 10 USD
              </p>
            </div>
            {loading && (
              <p className="text-center text-blue-600 font-semibold mt-4">
                Please wait, sending email...
              </p>
            )}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModalCheck(false)}
                className="bg-gray-400 text-white px-5 py-3 rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!email.trim()) {
                    alert("Email cannot be empty!");
                    return;
                  }
                  handleCheckAssets();
                }}
                className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-md"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-300 w-full max-w-xl">
            <button
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center uppercase">
              DOWNLOAD EXCEL REPORT
            </h3>
            <div className="space-y-4">
              <select
                className="border px-4 py-2 rounded w-full"
                value={building}
                onChange={(e) => {
                  setBuilding(e.target.value);
                  setRoom(""); // Reset room khi đổi building
                }}
              >
                <option value="" disabled>Select Building</option>
                <option value="0">ALL</option>
                <option value="1">H1</option>
                <option value="2">H2</option>
                <option value="3">H3</option>
                <option value="4">H6</option>
              </select>
              <select
                className="border px-4 py-2 rounded w-full"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                disabled={!building}
              >
                <option value="" disabled>Select Room</option>
                {building &&
                  roomOptions[building].map((r) => (
                    <option key={r} value={r}>
                      {getFormattedRoomName(building, r)}
                    </option>
                  ))}
              </select>
              <select
                className="border px-4 py-2 rounded w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                {["ALL", "TEACHER_CHAIR", "STUDENT_DESK", "BLACK_BOARD", "PROJECTOR", "PROJECTION_SCREEN", "LOUDSPEAKER", "CEILING_FAN", "ELECTRIC_LIGHT"].map((t) => (
                  <option key={t} value={t}>
                    {t.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            {loading && (
              <p className="text-center text-blue-600 font-semibold mt-4">
                Please wait, sending email...
              </p>
            )}  
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!building.trim() || !room.trim() || !type.trim()) {
                    alert("Building ID, Room ID and Type cannot be empty!");
                    return;
                  }
                  handleDownloadExcel();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalEmail && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-md"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-300 w-full max-w-xl">
            <button
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setShowModalEmail(false)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center uppercase">
              GET REPORT BY EMAIL
            </h3>
            <div className="space-y-4">
              <select
                className="border px-4 py-2 rounded w-full"
                value={building}
                onChange={(e) => {
                  setBuilding(e.target.value);
                  setRoom(""); // Reset room khi đổi building
                }}
              >
                <option value="" disabled>Select Building</option>
                <option value="0">ALL</option>
                <option value="1">H1</option>
                <option value="2">H2</option>
                <option value="3">H3</option>
                <option value="4">H6</option>
              </select>
              <select
                className="border px-4 py-2 rounded w-full"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                disabled={!building}
              >
                <option value="" disabled>Select Room</option>
                {building &&
                  roomOptions[building].map((r) => (
                    <option key={r} value={r}>
                      {getFormattedRoomName(building, r)}
                    </option>
                  ))}
              </select>
              <select
                className="border px-4 py-2 rounded w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                {["ALL", "TEACHER_CHAIR", "STUDENT_DESK", "BLACK_BOARD", "PROJECTOR", "PROJECTION_SCREEN", "LOUDSPEAKER", "CEILING_FAN", "ELECTRIC_LIGHT"].map((t) => (
                  <option key={t} value={t}>
                    {t.replace("_", " ")}
                  </option>
                ))}
              </select>
              <input
                type="email"
                className="border px-4 py-2 rounded w-full"
                placeholder="Enter email for report"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModalEmail(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!building.trim() || !room.trim() || !type.trim() || !email.trim()) {
                    alert("Building ID, Room ID, Type and Email cannot be empty!");
                    return;
                  }
                  handleGetReportByEmail();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {downloadLink && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">Download Link:</p>
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {downloadLink}
          </a>
        </div>
      )}

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
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-600"
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
      {
        selectedAsset && (
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
        )
      }
    </div >
  );
};

export default DepreciationCal;
