import { useState } from "react";
import ItemList from "../modal/ItemList";
import ItemFaultyList from "../modal/ItemFaultyList";
import InputFaulty from "../modal/InputFaulty";

const BuildingDetail = () => {
  const [isItemListOpen, setIsItemListOpen] = useState(false);
  const [isFaultyListOpen, setIsFaultyListOpen] = useState(false);
  const [isFaultyInputOpen, setIsFaultyInputOpen] = useState(false);
  const [faultyItems, setFaultyItems] = useState([]);

  const addFaultyItem = (code) => {
    // Add only if code is not already in the list
    if (code && !faultyItems.includes(code)) {
      setFaultyItems([...faultyItems, code]);
    }
  };

  const removeFaultyItem = (code) => {
    setFaultyItems(faultyItems.filter((item) => item !== code));
  };

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
              onClick={() => setIsFaultyInputOpen(true)}
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
              <div
                className="text-sm text-gray-500 font-extralight"
                onClick={() => setIsItemListOpen(true)}
              >
                Danh sách thiết bị
              </div>
              <div
                className="text-sm text-red-500 font-extralight"
                onClick={() => setIsFaultyListOpen(true)}
              >
                5 thiết bị đang gặp vấn đề
              </div>
            </div>
            {/* Repeat similar blocks for other rooms as needed */}
          </div>
        </div>
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
    </>
  );
};

export default BuildingDetail;
