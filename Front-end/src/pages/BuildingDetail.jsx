import { useState, useEffect } from "react";
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
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [roomData, setRoomData] = useState([]);
  const [buildingData, setBuildingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkToken = async () => {
    const token = localStorage.getItem('TOKEN');
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    
    if (!token) {
      return false;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/introspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();
      
      // If token is invalid and we have a refresh token, try to refresh
      if (data.code !== 200 && refreshToken) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          return true;
        }
      }
      
      return data.code === 200;
    } catch (error) {
      console.error('Token validation error:', error);
      // Try to refresh token on error if we have a refresh token
      if (refreshToken) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          return true;
        }
      }
      return false;
    }
  };

  const refreshTokenIfNeeded = async () => {
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken })
      });

      const data = await response.json();
      
      if (data.code === 200 && data.result) {
        // Update stored tokens
        localStorage.setItem('TOKEN', data.result.token);
        localStorage.setItem('REFRESH_TOKEN', data.result.refreshToken);
        return data.result.token;
      }
      
      return null;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await checkToken();
      if (!isLoggedIn) {
        setError('Vui lòng đăng nhập để xem thông tin');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('TOKEN');
        
        // Fetch building assets summary
        const summaryResponse = await fetch('http://localhost:8080/api/buildings/assets-summary', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const summaryData = await summaryResponse.json();
        
        if (summaryData.code === 200) {
          // Convert id from "h1" to "1" for API call
          const buildingId = id.replace('h', '');
          const currentBuilding = summaryData.result.find(building => building.id === parseInt(buildingId));
          if (currentBuilding) {
            setBuildingData(currentBuilding);
          } else {
            setError('Không tìm thấy thông tin tòa nhà');
          }
        }

        // Fetch room data with numeric ID
        const roomResponse = await fetch(`http://localhost:8080/api/room/infor/${id.replace('h', '')}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const roomData = await roomResponse.json();
        
        if (roomData.code === 200) {
          setRoomData(roomData.result);
        } else {
          setError(roomData.message || 'Failed to fetch room data');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const roomImages = [
    "https://oisp.hcmut.edu.vn/wp-content/uploads/Gioi-thieu/Phong-da-chuc-nang_OISP_02.jpg?_t=1552528419",
    "https://oisp.hcmut.edu.vn/wp-content/uploads/Gioi-thieu/Phong-da-chuc-nang_OISP_02.jpg?_t=1552528419",
    "https://oisp.hcmut.edu.vn/wp-content/uploads/Gioi-thieu/Phong-da-chuc-nang_OISP_02.jpg?_t=1552528419",
    "https://oisp.hcmut.edu.vn/wp-content/uploads/Gioi-thieu/Phong-da-chuc-nang_OISP_02.jpg?_t=1552528419"
  ];

  const addFaultyItem = (code) => {
    if (code && !faultyItems.includes(code)) {
      setFaultyItems([...faultyItems, code]);
    }
  };

  const removeFaultyItem = (code) => {
    setFaultyItems(faultyItems.filter((item) => item !== code));
  };

  const filteredRooms = roomData.filter(room => 
    room.roomName.startsWith(selectedFloor.toString())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!buildingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Không tìm thấy thông tin tòa nhà</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Building Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-6 transform hover:scale-[1.01] transition-all duration-300 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Tòa BK.{buildingData.name}</h1>
            <p className="text-gray-600 text-base">Tòa nhà giảng dạy và nghiên cứu</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-gray-600">Tổng số phòng</p>
              <p className="text-2xl font-bold text-blue-600">{buildingData.totalRooms}</p>
            </div>
            <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-xl border border-green-100">
              <p className="text-xs text-gray-600">Tổng tài sản</p>
              <p className="text-2xl font-bold text-green-600">{buildingData.assets.totalQuan}</p>
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

        {/* Asset Summary Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg shadow-sm">
            <p className="text-sm text-purple-600">Ghế giảng viên</p>
            <p className="text-2xl font-bold text-purple-600">
              {buildingData.teacherChair.total} ({buildingData.teacherChair.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
            <p className="text-sm text-blue-600">Bàn học sinh</p>
            <p className="text-2xl font-bold text-blue-600">
              {buildingData.studentDesk.total} ({buildingData.studentDesk.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
            <p className="text-sm text-yellow-600">Bảng đen</p>
            <p className="text-2xl font-bold text-yellow-600">
              {buildingData.blackboard.total} ({buildingData.blackboard.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg shadow-sm">
            <p className="text-sm text-indigo-600">Máy chiếu</p>
            <p className="text-2xl font-bold text-indigo-600">
              {buildingData.projector.total} ({buildingData.projector.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg shadow-sm">
            <p className="text-sm text-pink-600">Màn chiếu</p>
            <p className="text-2xl font-bold text-pink-600">
              {buildingData.projectorScreen.total} ({buildingData.projectorScreen.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg shadow-sm">
            <p className="text-sm text-teal-600">Quạt trần</p>
            <p className="text-2xl font-bold text-teal-600">
              {buildingData.ceilingFan.total} ({buildingData.ceilingFan.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Loa</p>
            <p className="text-2xl font-bold text-gray-600">
              {buildingData.loudspeaker.total} ({buildingData.loudspeaker.broken} hư)
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-sm text-orange-600">Đèn điện</p>
            <p className="text-2xl font-bold text-orange-600">
              {buildingData.electricLight.total} ({buildingData.electricLight.broken} hư)
            </p>
          </div>
        </div>
      </div>

      {/* Floor Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-6 border border-gray-100">
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((floor) => (
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
        {filteredRooms.map((room, i) => (
          <div
            key={room.roomName}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-all duration-300 group border border-gray-100"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={roomImages[i % roomImages.length]}
                alt={`Phòng ${room.roomName}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                {room.roomName}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Phòng {room.roomName}
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-green-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-green-600">Tổng số</p>
                  <p className="text-sm font-semibold text-green-700">{room.totalAssets}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-blue-600">Bình thường</p>
                  <p className="text-sm font-semibold text-blue-700">{room.normalAssets}</p>
                </div>
                <div className="bg-red-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-red-600">Hư hỏng</p>
                  <p className="text-sm font-semibold text-red-700">{room.brokenAssets}</p>
                </div>
              </div>
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
                  {room.brokenAssets} thiết bị cần bảo trì
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
