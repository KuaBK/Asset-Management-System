import React, { useState } from "react";

const allItems = {
  BAN1: {
    name: "Bàn",
    type: "Bàn học sinh",
    description: "Bàn học sinh tiêu chuẩn",
    dimensions: "120cm x 60cm x 75cm",
    purchaseDate: "2023-01-15",
    expiryDate: "2025-01-15",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  GHE1: {
    name: "Ghế",
    type: "Ghế xoay",
    description: "Ghế xoay văn phòng",
    dimensions: "50cm x 50cm x 120cm",
    purchaseDate: "2023-02-20",
    expiryDate: "2025-02-20",
    image: "https://images.unsplash.com/photo-1503602642455-232c88918244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  BANGHE1: {
    name: "Bàn ghế",
    type: "Bộ bàn ghế họp",
    description: "Bộ bàn ghế phòng họp",
    dimensions: "200cm x 80cm x 75cm",
    purchaseDate: "2023-03-10",
    expiryDate: "2025-03-10",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  MAYCHIEU1: {
    name: "Máy chiếu",
    type: "Máy chiếu Full HD",
    description: "Máy chiếu phòng học",
    dimensions: "30cm x 25cm x 15cm",
    purchaseDate: "2023-04-05",
    expiryDate: "2025-04-05",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
};

const InputFaulty = ({ onAddFaultyItem, onClose }) => {
  const [itemCode, setItemCode] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAdd = () => {
    if (itemCode && allItems[itemCode]) {
      onAddFaultyItem(itemCode);
      setItemCode("");
      setSelectedItem(null);
      onClose();
    } else {
      alert("Mã hàng không hợp lệ");
    }
  };

  const handleCodeChange = (e) => {
    const code = e.target.value;
    setItemCode(code);
    setSelectedItem(allItems[code] || null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Thông Báo Thiết Bị Hư</h2>
            <p className="text-gray-500 mt-1">Nhập mã số thiết bị cần báo cáo</p>
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

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã số thiết bị
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={itemCode}
                  onChange={handleCodeChange}
                  placeholder="Nhập mã số hàng"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleAdd}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Thêm</span>
                </button>
              </div>
            </div>

            {selectedItem && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{selectedItem.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{selectedItem.type}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Kích thước:</span>{" "}
                        {selectedItem.dimensions}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Ngày mua:</span>{" "}
                        {selectedItem.purchaseDate}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Ngày hết hạn:</span>{" "}
                        {selectedItem.expiryDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Danh sách mã thiết bị</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(allItems).map(([code, item]) => (
                  <div
                    key={code}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <span className="font-medium">{code}:</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFaulty;