import { useState } from "react";

const allItems = {
  BAN1: {
    name: "Bàn",
    type: "Bàn học sinh",
    description: "Bàn học sinh tiêu chuẩn",
    dimensions: "120cm x 60cm x 75cm",
    purchaseDate: "2023-01-15",
    expiryDate: "2025-01-15",
  },
  GHE1: {
    name: "Ghế",
    type: "Ghế xoay",
    description: "Ghế xoay văn phòng",
    dimensions: "50cm x 50cm x 120cm",
    purchaseDate: "2023-02-20",
    expiryDate: "2025-02-20",
  },
  BANGHE1: {
    name: "Bàn ghế",
    type: "Bộ bàn ghế họp",
    description: "Bộ bàn ghế phòng họp",
    dimensions: "200cm x 80cm x 75cm",
    purchaseDate: "2023-03-10",
    expiryDate: "2025-03-10",
  },
  MAYCHIEU1: {
    name: "Máy chiếu",
    type: "Máy chiếu Full HD",
    description: "Máy chiếu phòng học",
    dimensions: "30cm x 25cm x 15cm",
    purchaseDate: "2023-04-05",
    expiryDate: "2025-04-05",
  },
};

const ItemFaultyList = ({ faultyItems, onRemove, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Danh Sách Hàng Lỗi</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* List of Faulty Items */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Danh Sách Hàng Lỗi</h3>
              <div className="space-y-2">
                {faultyItems.map((code) => (
                  <div
                    key={code}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedItem === code
                        ? "bg-red-100"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedItem(code)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{code}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(code);
                        }}
                        className="text-red-500 hover:text-red-700"
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
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Thông Tin Chi Tiết</h3>
              {selectedItem && allItems[selectedItem] ? (
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Mã:</span> {selectedItem}
                  </p>
                  <p>
                    <span className="font-medium">Tên:</span>{" "}
                    {allItems[selectedItem].name}
                  </p>
                  <p>
                    <span className="font-medium">Loại:</span>{" "}
                    {allItems[selectedItem].type}
                  </p>
                  <p>
                    <span className="font-medium">Mô tả:</span>{" "}
                    {allItems[selectedItem].description}
                  </p>
                  <p>
                    <span className="font-medium">Kích thước:</span>{" "}
                    {allItems[selectedItem].dimensions}
                  </p>
                  <p>
                    <span className="font-medium">Ngày mua:</span>{" "}
                    {allItems[selectedItem].purchaseDate}
                  </p>
                  <p>
                    <span className="font-medium">Ngày hết hạn:</span>{" "}
                    {allItems[selectedItem].expiryDate}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  Chọn một hàng lỗi để xem chi tiết
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFaultyList;
