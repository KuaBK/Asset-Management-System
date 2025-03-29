
import { useState } from "react";
import Swal from 'sweetalert2'
const typelist = [
    "TEACHER_CHAIR",
    "STUDENT_DESK",
    "BLACK_BOARD",
    "PROJECTOR",
    "PROJECTION_SCREEN",
    "LOUDSPEAKER",
    "CEILING_FAN",
    "ELECTRIC_LIGHT"
]
export default function AddAssetModal({ isOpen, onClose, id, res }) {
    const [form, setForm] = useState({
        assetType: "",
        roomId: "",
        seriesAsset: "",
        dateInSystem: "",
        estimatedLife: "",
        originalValue: "",
        depreciationRate: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("TOKEN");
        try {
            const response = await fetch("http://localhost:8080/api/asset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(convertForm(form)),
            });

            if (!response.ok) {
                Swal.fire({ icon: "error", title: "Oops...", text: "Something is error!" });
                // throw new Error("Login failed");
            }

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "Add success!",
                    icon: "success",
                    draggable: true
                });
                // localStorage.setItem("TOKEN", data.result.token);
                // Giải mã token để lấy userId
                // const decodedToken = jwtDecode(data.result.token);
                // const userId = decodedToken.accountId; // Thay đổi theo key thực tế trong token

                // Lưu userId vào localStorage
                // localStorage.setItem("userId", userId);

                // navigate("/home");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
        setForm({
            assetType: "",
            roomId: "",
            seriesAsset: "",
            dateInSystem: "",
            estimatedLife: "",
            originalValue: "",
            depreciationRate: "",
        })
        onClose();
    };

    if (!isOpen) return null;

    const convertID = (id) => {
        switch (id) {
            case "h1":
                return 1;
            case "h2":
                return 2;
            case "h3":
                return 3;
            case "h6":
                return 4;
        }
    }
    const formatRoomId = (roomId) => {
        // var idid= `1${roomId}`
        return `1${roomId}`;
    };
    const convertForm = (formdata) => {
        // console.log("formdataxxxx",formdata);
        switch (formdata.assetType) {
            case "TEACHER_CHAIR":
                var form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "IKEA",
                    "model": "ErgoChair",
                    "type": "Chair",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "STUDENT_DESK":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "EduFurn",
                    "model": "ClassicWood",
                    "type": "ChairDesk",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "BLACK_BOARD":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "Samsung",
                    "model": "ClassicWood",
                    "type": "Board",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "PROJECTOR":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "Samsung",
                    "model": "ClassicWood",
                    "type": "Board",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "PROJECTION_SCREEN":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "Samsung",
                    "model": "ClassicWood",
                    "type": "Board",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "LOUDSPEAKER":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "Samsung",
                    "model": "ClassicWood",
                    "type": "Board",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "CEILING_FAN":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "Samsung",
                    "model": "ClassicWood",
                    "type": "Board",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
            case "ELECTRIC_LIGHT":
                form = {
                    "assetType": formdata.assetType,
                    "buildingId": convertID(id),
                    "roomId": parseInt(formatRoomId(formdata.roomId)),
                    "series": formdata.seriesAsset,
                    "isBroken": false,
                    "brand": "Samsung",
                    "model": "ClassicWood",
                    "type": "Board",
                    "material": "Wood",
                    "productYear": parseInt(formdata.dateInSystem.split("-")[0]),
                    "dateInSystem": formdata.dateInSystem,
                    "estimatedLife": parseInt(formdata.estimatedLife),
                    "originalValue": parseFloat(formdata.originalValue),
                    "depreciationRate": parseFloat(formdata.depreciationRate/100)
                }
                return form
        }

    }

    // ,
    // ,
    // ,
    // ,
    // CEILING_FAN,
    // 
    return (
        <div className="absolute mx-auto mt-[50px] inset-0 w-fit h-fit flex items-center justify-center z-10 rounded-[30px]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-[32px] font-bold text-center text-blue-500 mb-4">ADD ASSET</h2>
                <form onSubmit={handleSubmit} className="space-y-4 w-[300px] flex flex-col m-auto">
                    <select name="assetType" value={form.assetType} onChange={handleChange} className="w-full p-2 border  rounded-[30px]" required>
                        {typelist?.map((item) => (
                            <option value={item}>{item}</option>
                        ))}

                    </select>
                    <select name="roomId" value={form.roomId} onChange={handleChange} className="w-full p-2 border  rounded-[30px]" required>
                        {res?.map((item) => (
                            <option value={item.roomName}>{item.roomName}</option>
                        ))}
                    </select>
                    <input type="text" name="seriesAsset" value={form.seriesAsset} onChange={handleChange} placeholder="Series Asset" className="w-full p-2 border rounded-[30px]" required />
                    <input type="date" name="dateInSystem" value={form.dateInSystem} onChange={handleChange} className="w-full p-2 border  rounded-[30px]" required />
                    <input type="number" name="estimatedLife" value={form.estimatedLife} onChange={handleChange} placeholder="Estimated Life" className="w-full p-2 border  rounded-[30px]" required />
                    <input type="number" name="originalValue" value={form.originalValue} onChange={handleChange} placeholder="Original Value" className="w-full p-2 border  rounded-[30px]" required />
                    <input type="number" name="depreciationRate" value={form.depreciationRate} onChange={handleChange} placeholder="Depreciation Rate (%)" className="w-full p-2 border  rounded-[30px]" required />
                    <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300  rounded-[30px]">Close</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white  rounded-[30px]">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
