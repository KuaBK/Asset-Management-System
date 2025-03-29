import { useState, useEffect } from "react";

// Asset type mapping for images
const getAssetImage = (assetType) => {
  const assetImages = {
    CEILING_FAN: "https://via.placeholder.com/150?text=Ceiling+Fan",
    BLACK_BOARD: "https://via.placeholder.com/150?text=Black+Board",
    PROJECTOR: "https://via.placeholder.com/150?text=Projector",
    STUDENT_DESK: "https://via.placeholder.com/150?text=Student+Desk",
    TEACHER_CHAIR: "https://via.placeholder.com/150?text=Teacher+Chair",
    ELECTRIC_LIGHT: "https://via.placeholder.com/150?text=Electric+Light",
    PROJECTION_SCREEN: "https://via.placeholder.com/150?text=Projection+Screen",
    LOUDSPEAKER: "https://via.placeholder.com/150?text=Loudspeaker"
  };
  return assetImages[assetType] || "https://via.placeholder.com/150?text=Asset";
};

const ItemFaultyList = ({ buildingId, roomId, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [brokenAssets, setBrokenAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assetType, setAssetType] = useState("STUDENT_DESK");
  const [assetTypeCounts, setAssetTypeCounts] = useState({});

  const assetTypes = [
    "TEACHER_CHAIR",
    "STUDENT_DESK",
    "BLACK_BOARD",
    "PROJECTOR",
    "PROJECTION_SCREEN",
    "LOUDSPEAKER",
    "CEILING_FAN",
    "ELECTRIC_LIGHT"
  ];

  useEffect(() => {
    const fetchBrokenAssets = async () => {
      try {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
          setError("Please login to view broken assets");
          setLoading(false);
          return;
        }

        // Fetch broken assets for all asset types
        const counts = {};
        for (const type of assetTypes) {
          const response = await fetch(
            `http://localhost:8080/api/asset/list/broken?buildingId=${buildingId}&roomId=${buildingId + "" + roomId}&assetType=${type}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            counts[type] = data.ListBrokenAssets?.length || 0;
          }
        }
        setAssetTypeCounts(counts);

        // Fetch detailed data for selected asset type
        const selectedResponse = await fetch(
          `http://localhost:8080/api/asset/list/broken?buildingId=${buildingId}&roomId=${buildingId + "" + roomId}&assetType=${assetType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const selectedData = await selectedResponse.json();
        if (selectedResponse.ok) {
          setBrokenAssets(selectedData.ListBrokenAssets || []);
        } else {
          setError(selectedData.message || "Failed to fetch broken assets");
        }
      } catch (err) {
        setError("Error fetching broken assets");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokenAssets();
  }, [buildingId, roomId, assetType]);

  // Filter asset types to only show those with broken items
  const availableAssetTypes = assetTypes.filter(type => assetTypeCounts[type] > 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Danh Sách Hàng Lỗi</h2>
            <p className="text-gray-500 mt-1">Quản lý và theo dõi thiết bị hư hỏng</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Asset Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-y-auto lg:col-span-1">
              <h3 className="font-semibold text-gray-800 mb-4">Loại Thiết Bị</h3>
              <div className="space-y-2">
                {availableAssetTypes.map((type) => (
                  <button
                    key={type}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      assetType === type
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                    }`}
                    onClick={() => setAssetType(type)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{type.replace(/_/g, " ")}</span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
                        {assetTypeCounts[type]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* List of Broken Assets */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-y-auto lg:col-span-2">
              <h3 className="font-semibold text-gray-800 mb-4">Thiết Bị Hư Hỏng</h3>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full text-red-500">
                  {error}
                </div>
              ) : brokenAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg
                    className="w-12 h-12 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>Không có thiết bị hư hỏng</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brokenAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedItem?.id === asset.id
                          ? "bg-red-50 border border-red-100"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                      }`}
                      onClick={() => setSelectedItem(asset)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={getAssetImage(asset.assetType)}
                            alt={asset.type}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{asset.series}</h4>
                              <p className="text-sm text-gray-500">{asset.type}</p>
                            </div>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                              Hư hỏng
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">Thương hiệu:</span>
                              <span className="font-medium ml-1">{asset.brand}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Model:</span>
                              <span className="font-medium ml-1">{asset.model}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Chất liệu:</span>
                              <span className="font-medium ml-1">{asset.material}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Năm SX:</span>
                              <span className="font-medium ml-1">{asset.productYear}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Ngày nhập:</span>
                              <span className="font-medium ml-1">{asset.dateInSystem.join('-')}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Hết hạn:</span>
                              <span className="font-medium ml-1">{asset.expireDate.join('-')}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Tuổi thọ:</span>
                              <span className="font-medium ml-1">{asset.estimatedLife} năm</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Giá gốc:</span>
                              <span className="font-medium ml-1">{asset.originalValue.toLocaleString()}đ</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Giá còn:</span>
                              <span className="font-medium ml-1">{asset.residualValue.toLocaleString()}đ</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Khấu hao:</span>
                              <span className="font-medium ml-1">{asset.depreciationRate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFaultyList;
