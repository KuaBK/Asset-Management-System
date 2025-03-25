import { useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../modal/ItemList";
import ItemFaultyList from "../modal/ItemFaultyList";
import InputFaulty from "../modal/InputFaulty";

const BuildingDetail = () => {
  const { id } = useParams();
  const [isItemListOpen, setIsItemListOpen] = useState(false);
  const [isFaultyListOpen, setIsFaultyListOpen] = useState(false);
  const [isFaultyInputOpen, setIsFaultyInputOpen] = useState(false);
  const [faultyItems, setFaultyItems] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(6);

  const buildingData = {
    h1: { 
      name: "Tòa BK.H1", 
      floors: [1, 2, 3, 4, 5, 6],
      description: "Tòa nhà giảng dạy và nghiên cứu",
      totalRooms: 24,
      totalAssets: 1200
    },
    h2: { 
      name: "Tòa BK.H2", 
      floors: [1, 2, 3, 4, 5],
      description: "Tòa nhà thực hành và thí nghiệm",
      totalRooms: 20,
      totalAssets: 1000
    },
    h3: { 
      name: "Tòa BK.H3", 
      floors: [1, 2, 3, 4, 5, 6],
      description: "Tòa nhà nghiên cứu và phát triển",
      totalRooms: 24,
      totalAssets: 1500
    },
    h6: { 
      name: "Tòa BK.H6", 
      floors: [1, 2, 3, 4, 5],
      description: "Tòa nhà đa chức năng",
      totalRooms: 20,
      totalAssets: 1300
    }
  };

  const currentBuilding = buildingData[id] || buildingData.h1;

  const roomImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  const addFaultyItem = (code) => {
    if (code && !faultyItems.includes(code)) {
      setFaultyItems([...faultyItems, code]);
    }
  };

  const removeFaultyItem = (code) => {
    setFaultyItems(faultyItems.filter((item) => item !== code));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Building Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-6 transform hover:scale-[1.01] transition-all duration-300 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{currentBuilding.name}</h1>
            <p className="text-gray-600 text-base">{currentBuilding.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-gray-600">Tổng số phòng</p>
              <p className="text-2xl font-bold text-blue-600">{currentBuilding.totalRooms}</p>
            </div>
            <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-xl border border-green-100">
              <p className="text-xs text-gray-600">Tổng tài sản</p>
              <p className="text-2xl font-bold text-green-600">{currentBuilding.totalAssets}</p>
            </div>
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md hover:scale-105"
              onClick={() => setIsFaultyInputOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-sm">Báo cáo sự cố</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floor Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-6 border border-gray-100">
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          {currentBuilding.floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedFloor === floor
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <span className="font-medium text-sm">Tầng {floor}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-all duration-300 group border border-gray-100"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={roomImages[i]}
                alt={`Phòng ${selectedFloor}0${i + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                {selectedFloor}0{i + 1}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Phòng {selectedFloor}0{i + 1}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setIsItemListOpen(true)}
                  className="w-full py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  Xem danh sách thiết bị
                </button>
                <button
                  onClick={() => setIsFaultyListOpen(true)}
                  className="w-full py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-lg hover:from-red-100 hover:to-red-200 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  5 thiết bị cần bảo trì
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isItemListOpen && <ItemList onClose={() => setIsItemListOpen(false)} />}
      {isFaultyListOpen && (
        <ItemFaultyList
          faultyItems={faultyItems}
          onRemove={removeFaultyItem}
          onClose={() => setIsFaultyListOpen(false)}
        />
      )}
      {isFaultyInputOpen && (
        <InputFaulty
          onAddFaultyItem={addFaultyItem}
          onClose={() => setIsFaultyInputOpen(false)}
        />
      )}
    </div>
  );
};

export default BuildingDetail;