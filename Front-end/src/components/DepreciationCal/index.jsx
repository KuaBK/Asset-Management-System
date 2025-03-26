import React , {useState} from "react";

const assets = [
  { name: "Projectors", quantity: 19, originalValue: "100.000.000", residualValue: "50.000.000" },
  { name: "Projector Screens", quantity: 24, originalValue: "10.000.000", residualValue: "5.800.000" },
  { name: "Teacher chairs", quantity: 24, originalValue: "2.400.000", residualValue: "1.600.000" },
  { name: "Student chairs", quantity: 258, originalValue: "120.000.000", residualValue: "85.000.000" },
  { name: "Ceiling fans", quantity: 59, originalValue: "70.000.000", residualValue: "55.000.000" },
  { name: "Blackboards", quantity: 26, originalValue: "13.000.000", residualValue: "9.000.000" },
  { name: "Loud speakers", quantity: 20, originalValue: "40.000.000", residualValue: "26.500.000" },
  { name: "Electric lights", quantity: 47, originalValue: "70.000.000", residualValue: "48.000.000" },
];



const DepreciationCal = () => {

    const [selectedAsset, setSelectedAsset] = useState(null);
  return (
    <div className="py-4 px-6 lg:px-8 flex flex-col items-center">
      {/* Tiêu đề */}
      <div className="mt-4 flex items-center justify-center space-x-4">
    <h2 className="text-xl font-bold bg-blue-500 text-white py-2 px-6 rounded-lg">
      DEPRECIATION TABLE
    </h2>
    <select className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024" selected>2024</option>
    </select>
  </div>

      {/* Bảng dữ liệu */}
      <div className="mt-20 w-full max-w-7xl overflow-x-auto">
        <table className="min-w-full border-collapse border border-blue-400">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-blue-400 px-4 py-2 text-center">Assets</th>
              <th className="border border-blue-400  px-4 py-2 text-center">Quantity</th>
              <th className="border border-blue-400  px-4 py-2 text-center">Total Original Value (VNĐ)</th>
              <th className="border border-blue-400  px-4 py-2 text-center">Total Residual Value (VNĐ)</th>
              <th className="border border-blue-400  px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-blue-100">
                <td className="border border-blue-400 px-4 py-2 text-center">{item.name}</td>
                <td className="border border-blue-400 px-4 py-2 text-center">{item.quantity}</td>
                <td className="border border-blue-400 px-6 py-3 text-center">{item.originalValue}</td>
                <td className="border border-blue-400 px-6 py-3 text-center">{item.residualValue}</td>
                <td className="border border-blue-400 px-6 py-3 text-center">
                  <button onClick={() => setSelectedAsset(item)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>


{/* Modal */}
{selectedAsset && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent-900 bg-opacity-200 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center uppercase">{selectedAsset.name}</h3>

            {/* Bảng trong Modal */}
            <table className="min-w-full border-collapse border border-blue-400">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-blue-400 px-6 py-3 text-center">Name</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Original Value (VNĐ)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Residual Value (VNĐ)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Depreciation Rate (% per six months)</th>
                  <th className="border border-blue-400 px-6 py-3 text-center">Usage Time (Years)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-blue-400 px-6 py-3 text-center font-bold">{selectedAsset.name}</td>
                  <td className="border border-blue-400 px-6 py-3 text-center">{selectedAsset.originalValue}</td>
                  <td className="border border-blue-400 px-6 py-3 text-center">{selectedAsset.residualValue}</td>
                  <td className="border border-blue-400 px-6 py-3 text-center">{selectedAsset.depreciationRate}</td>
                  <td className="border border-blue-400 px-6 py-3 text-center">{selectedAsset.usageTime}</td>
                </tr>
              </tbody>
            </table>

            {/* Nút đóng Modal */}
            <button
              onClick={() => setSelectedAsset(null)}
              className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DepreciationCal;
