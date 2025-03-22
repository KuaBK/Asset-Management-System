import React, { useState } from 'react';

const ItemListModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  // Updated data with detailed information
  const items = [
    {
      id: 1,
      name: 'Bàn',
      category: 'Nội thất',
      quantity: 10,
      details: Array(10).fill(null).map((_, index) => ({
        id: `BAN${index + 1}`,
        type: 'Bàn học sinh',
        description: 'Bàn học sinh tiêu chuẩn',
        dimensions: '120cm x 60cm x 75cm',
        purchaseDate: '2023-01-15',
        expiryDate: '2025-01-15'
      }))
    },
    {
      id: 2,
      name: 'Ghế',
      category: 'Nội thất',
      quantity: 20,
      details: Array(20).fill(null).map((_, index) => ({
        id: `GHE${index + 1}`,
        type: 'Ghế xoay',
        description: 'Ghế xoay văn phòng',
        dimensions: '50cm x 50cm x 120cm',
        purchaseDate: '2023-02-20',
        expiryDate: '2025-02-20'
      }))
    },
    {
      id: 3,
      name: 'Bàn ghế',
      category: 'Nội thất',
      quantity: 5,
      details: Array(5).fill(null).map((_, index) => ({
        id: `BANGHE${index + 1}`,
        type: 'Bộ bàn ghế họp',
        description: 'Bộ bàn ghế phòng họp',
        dimensions: '200cm x 80cm x 75cm',
        purchaseDate: '2023-03-10',
        expiryDate: '2025-03-10'
      }))
    },
    {
      id: 4,
      name: 'Máy chiếu',
      category: 'Thiết bị điện tử',
      quantity: 3,
      details: Array(3).fill(null).map((_, index) => ({
        id: `MAYCHIEU${index + 1}`,
        type: 'Máy chiếu Full HD',
        description: 'Máy chiếu phòng học',
        dimensions: '30cm x 25cm x 15cm',
        purchaseDate: '2023-04-05',
        expiryDate: '2025-04-05'
      }))
    }
  ];

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Xem Danh Sách Đồ Vật
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Danh Sách Đồ Vật</h2>
              <button
                onClick={() => setIsOpen(false)}
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

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div
                      onClick={() => toggleItem(item.id)}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">
                          Số lượng: {item.quantity}
                        </span>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            expandedItem === item.id ? 'rotate-180' : ''
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
                        expandedItem === item.id ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <div className="p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar">
                          {item.details.map((detail, index) => (
                            <div
                              key={detail.id}
                              className="bg-white p-3 rounded-lg shadow-sm"
                            >
                              <h4 className="font-medium mb-2">{item.name} #{index + 1}</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Mã:</span> {detail.id}</p>
                                <p><span className="font-medium">Loại:</span> {detail.type}</p>
                                <p><span className="font-medium">Mô tả:</span> {detail.description}</p>
                                <p><span className="font-medium">Kích thước:</span> {detail.dimensions}</p>
                                <p><span className="font-medium">Ngày mua:</span> {detail.purchaseDate}</p>
                                <p><span className="font-medium">Ngày hết hạn:</span> {detail.expiryDate}</p>
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
      )}
    </div>
  );
};

export default ItemListModal; 