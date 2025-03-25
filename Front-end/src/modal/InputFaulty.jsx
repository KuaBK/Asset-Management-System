import React, { useState } from "react";

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

const InputFaulty = ({ onAddFaultyItem, onClose }) => {
  const [itemCode, setItemCode] = useState("");

  const handleAdd = () => {
    // Check if the code exists in our product list
    if (itemCode && allItems[itemCode]) {
      onAddFaultyItem(itemCode);
      setItemCode("");
      onClose();
    } else {
      alert("Mã hàng không hợp lệ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Thông Báo Thiết Bị Hư</h2>
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
          <div className="flex gap-2">
            <input
              type="text"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              placeholder="Nhập mã số hàng"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFaulty;
