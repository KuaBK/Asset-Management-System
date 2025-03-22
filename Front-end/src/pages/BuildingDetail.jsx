const BuildingDetail = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen space-y-5">
        {/* Title */}
        <div
          className="flex-[1] relative flex text-center justify-center items-center
                border-dashed border-2 border-red-500"
        >
          <div className="text-5xl font w-full text-center">Tòa BK.B6</div>
          <div className="absolute right-10">
            <div>Số lượng phòng hiện tại: 3</div>
            <button
              className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-800 text-white rounded transition-colors duration-200"
              onClick={() => console.log("Button clicked")}
            >
              Thông báo thiết bị hư
            </button>
          </div>
        </div>

        {/* Room list */}
        <div className="flex-[6] border-dashed border-2 border-green-500">
          <div className="grid grid-cols-3 gap-24 p-4">
            <div className="h-30 border-2 rounded-2xl p-5 flex-col items-center justify-center text-center space-y-2">
              <div className="text-2xl font-medium">Phòng 601</div>
              <div className="text-sm text-gray-500 font-extralight">
                Danh sách thiết bị
              </div>
              <div className="text-sm text-red-500 font-extralight">
                5 thiết bị đang gặp vấn đề
              </div>
            </div>
            <div className="h-30 border-2 p-5 rounded-2xl flex-col items-center justify-center text-center space-y-2">
              <div className="text-2xl font-medium">Phòng 602</div>
              <div className="text-sm text-gray-500 font-extralight">
                Danh sách thiết bị
              </div>
              <div className="text-sm text-red-500 font-extralight">
                5 thiết bị đang gặp vấn đề
              </div>
            </div>
            <div className="h-30 border-2 p-5 rounded-2xl flex-col items-center justify-center text-center space-y-2">
              <div className="text-2xl font-medium">Phòng 603</div>
              <div className="text-sm text-gray-500 font-extralight">
                Danh sách thiết bị
              </div>
              <div className="text-sm text-red-500 font-extralight">
                5 thiết bị đang gặp vấn đề
              </div>
            </div>
            {/* <div className="border-2 p-4 rounded">Box 4</div>
            <div className="border-2 p-4 rounded">Box 5</div>
            <div className="border-2 p-4 rounded">Box 6</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingDetail;
