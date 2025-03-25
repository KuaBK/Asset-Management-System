import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Bàn",
    category: "Nội thất",
    quantity: 10,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    details: Array(10)
      .fill(null)
      .map((_, index) => ({
        id: `BAN${index + 1}`,
        type: "Bàn học sinh",
        description: "Bàn học sinh tiêu chuẩn",
        dimensions: "120cm x 60cm x 75cm",
        purchaseDate: "2023-01-15",
        expiryDate: "2025-01-15",
      })),
  },
  {
    id: 2,
    name: "Ghế",
    category: "Nội thất",
    quantity: 20,
    image: "https://images.unsplash.com/photo-1503602642455-232c88918244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    details: Array(20)
      .fill(null)
      .map((_, index) => ({
        id: `GHE${index + 1}`,
        type: "Ghế xoay",
        description: "Ghế xoay văn phòng",
        dimensions: "50cm x 50cm x 120cm",
        purchaseDate: "2023-02-20",
        expiryDate: "2025-02-20",
      })),
  },
  {
    id: 3,
    name: "Bàn ghế",
    category: "Nội thất",
    quantity: 5,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    details: Array(5)
      .fill(null)
      .map((_, index) => ({
        id: `BANGHE${index + 1}`,
        type: "Bộ bàn ghế họp",
        description: "Bộ bàn ghế phòng họp",
        dimensions: "200cm x 80cm x 75cm",
        purchaseDate: "2023-03-10",
        expiryDate: "2025-03-10",
      })),
  },
  {
    id: 4,
    name: "Máy chiếu",
    category: "Thiết bị điện tử",
    quantity: 3,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    details: Array(3)
      .fill(null)
      .map((_, index) => ({
        id: `MAYCHIEU${index + 1}`,
        type: "Máy chiếu Full HD",
        description: "Máy chiếu phòng học",
        dimensions: "30cm x 25cm x 15cm",
        purchaseDate: "2023-04-05",
        expiryDate: "2025-04-05",
      })),
  },
];

const ItemList = ({ onClose }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Danh Sách Đồ Vật</h2>
            <p className="text-gray-500 mt-1">Quản lý và theo dõi tài sản</p>
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

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div
                  onClick={() => toggleItem(item.id)}
                  className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      Số lượng: {item.quantity}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedItem === item.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    expandedItem === item.id
                      ? "max-h-[60vh] opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[55vh] pr-2">
                      {item.details.map((detail, index) => (
                        <div
                          key={detail.id}
                          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={`${item.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {item.name} #{index + 1}
                              </h4>
                              <p className="text-sm text-gray-500">{detail.type}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Mã:</span>
                              <span className="font-medium">{detail.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Kích thước:</span>
                              <span className="font-medium">{detail.dimensions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Ngày mua:</span>
                              <span className="font-medium">{detail.purchaseDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Ngày hết hạn:</span>
                              <span className="font-medium">{detail.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
