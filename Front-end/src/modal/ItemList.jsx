import { useState, useEffect } from "react";
import images from '../assets/images.jpg'

const ItemList = ({ onClose, buildingId, roomId }) => {
  const [items, setItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hàm lấy hình ảnh tương ứng với assetType
  const getAssetImage = (assetType) => {
    const assetImages = {
      CEILING_FAN: {images},
      BLACK_BOARD: {images},
      PROJECTOR: {images},
      STUDENT_DESK: {images},
      TEACHER_CHAIR: {images},
      ELECTRIC_LIGHT: {images},
    };  
    return assetImages[assetType] || "https://via.placeholder.com/150?text=Asset";
  };

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      fetch("http://localhost:8080/api/auth/introspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoggedIn(data.result?.valid || false);
        })
        .catch(() => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch API lấy danh sách tài sản
  // console.log(buildingId, roomId);
  useEffect(() => {
    if (!isLoggedIn || !buildingId || !roomId) return;
    

    const token = localStorage.getItem("TOKEN");
    if (buildingId === 6) {buildingId = 4;}
    fetch(`http://localhost:8080/api/asset/count/Room-Building?buildingId=${buildingId}&roomId=${buildingId + "" + roomId}`, {
      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map((assetCategory, index) => ({
          id: index + 1,
          name: assetCategory.assetType,
          category: assetCategory.assetType,
          quantity: assetCategory.totalCount,
          image: getAssetImage(assetCategory.assetType),
          details: assetCategory.assets.map((asset) => ({
            id: asset.id,
            type: asset.type,
            description: asset.series,
            dimensions: asset.building.name,
            purchaseDate: asset.dateInSystem.join("-"),
            expiryDate: asset.expireDate.join("-"),
          })),
        }));
        setItems(transformed);
      })
      .catch((error) => console.error("Error fetching assets:", error));
  }, [isLoggedIn, buildingId, roomId]);

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Danh Sách Đồ Vật</h2>
            <p className="text-gray-500 mt-1">
              {isLoggedIn ? "Đã đăng nhập" : "Chưa đăng nhập"} - Quản lý và theo dõi tài sản
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Danh sách tài sản */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div onClick={() => toggleItem(item.id)} className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-colors">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">Số lượng: {item.quantity}</span>
                    <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedItem === item.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {expandedItem === item.id && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {item.details.map((detail) => (
                        <div key={detail.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <h4 className="font-medium text-gray-800">{item.name} #{detail.id}</h4>
                          <p className="text-sm text-gray-500">{detail.type}</p>
                          <p>Mã: {detail.id}</p>
                          <p>Kích thước: {detail.dimensions}</p>
                          <p>Ngày mua: {detail.purchaseDate}</p>
                          <p>Ngày hết hạn: {detail.expiryDate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
