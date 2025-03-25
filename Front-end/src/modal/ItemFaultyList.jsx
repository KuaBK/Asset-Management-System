import { useState } from "react";

const allItems = {
  BAN1: {
    name: "Bàn",
    type: "Bàn học sinh",
    description: "Bàn học sinh tiêu chuẩn",
    dimensions: "120cm x 60cm x 75cm",
    purchaseDate: "2023-01-15",
    expiryDate: "2025-01-15",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    issue: "Mặt bàn bị trầy xước"
  },
  GHE1: {
    name: "Ghế",
    type: "Ghế xoay",
    description: "Ghế xoay văn phòng",
    dimensions: "50cm x 50cm x 120cm",
    purchaseDate: "2023-02-20",
    expiryDate: "2025-02-20",
    image: "https://images.unsplash.com/photo-1503602642455-232c88918244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    issue: "Tay ghế bị gãy"
  },
  BANGHE1: {
    name: "Bàn ghế",
    type: "Bộ bàn ghế họp",
    description: "Bộ bàn ghế phòng họp",
    dimensions: "200cm x 80cm x 75cm",
    purchaseDate: "2023-03-10",
    expiryDate: "2025-03-10",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    issue: "Chân bàn bị lỏng"
  },
  MAYCHIEU1: {
    name: "Máy chiếu",
    type: "Máy chiếu Full HD",
    description: "Máy chiếu phòng học",
    dimensions: "30cm x 25cm x 15cm",
    purchaseDate: "2023-04-05",
    expiryDate: "2025-04-05",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    issue: "Không bật được"
  },
};

const ItemFaultyList = ({ faultyItems, onRemove, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);

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
            {/* List of Faulty Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-y-auto lg:col-span-1">
              <h3 className="font-semibold text-gray-800 mb-4">Danh Sách Hàng Lỗi</h3>
              <div className="space-y-3">
                {faultyItems.map((code) => (
                  <div
                    key={code}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedItem === code
                        ? "bg-red-50 border border-red-100"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                    }`}
                    onClick={() => setSelectedItem(code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={allItems[code]?.image}
                            alt={allItems[code]?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{code}</span>
                          <p className="text-sm text-gray-500">{allItems[code]?.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(code);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-y-auto lg:col-span-2">
              <h3 className="font-semibold text-gray-800 mb-4">Thông Tin Chi Tiết</h3>
              {selectedItem && allItems[selectedItem] ? (
                <div className="space-y-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={allItems[selectedItem].image}
                      alt={allItems[selectedItem].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Thông tin cơ bản</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Mã:</span>
                          <span className="font-medium">{selectedItem}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Tên:</span>
                          <span className="font-medium">{allItems[selectedItem].name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Loại:</span>
                          <span className="font-medium">{allItems[selectedItem].type}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Mô tả:</span>
                          <span className="font-medium">{allItems[selectedItem].description}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Thông tin kỹ thuật</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Kích thước:</span>
                          <span className="font-medium">{allItems[selectedItem].dimensions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Ngày mua:</span>
                          <span className="font-medium">{allItems[selectedItem].purchaseDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Ngày hết hạn:</span>
                          <span className="font-medium">{allItems[selectedItem].expiryDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Vấn đề</h4>
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                      {allItems[selectedItem].issue}
                    </div>
                  </div>
                </div>
              ) : (
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
                  <p>Chọn một hàng lỗi để xem chi tiết</p>
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
