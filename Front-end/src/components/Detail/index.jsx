import { useState } from "react";
import { useParams } from "react-router-dom";
import door from '../../assets/door.svg';
import BuildingDetail from "../../pages/BuildingDetail";
const res = {
    BKB1: { name: "Tòa nhà BKB1", totalAssets: 50, brokenAssets: 5 },
    BKB2: { name: "Tòa nhà BKB2", totalAssets: 60, brokenAssets: 6 },
    BKB3: { name: "Tòa nhà BKB3", totalAssets: 55, brokenAssets: 4 },
    BKB4: { name: "Tòa nhà BKB4", totalAssets: 70, brokenAssets: 7 },
};
const Room = ({name, normal, broken, total})=>{
    return (
        <div className="w-[300px] h-[180px] rounded-[40px] border border-black bg-white p-[20px] ">
            <div className="text-[16px] font-bold text-center">{name}</div>
            <dix className="flex mt-[10px] gap-[20px]">
                <img src={door} alt="" />
                {/* <div className="flex flex-col justify-between">
                    <div className="text-[14px] font-[600] ">Normal Assets: {normal}</div>
                    <div className="text-[14px] font-[600] ">Broken Assets: {broken}</div>
                    <div className="text-[14px] font-[600] ">Total Assets: {total}</div>
                </div> */}
                <table className="flex-1">
                    <tbody className="w-[70%]">
                        <tr> 
                            <td className="text-[14px] font-[600] text-start">Normal Assets:</td>
                            <td className="text-[14px] font-[600] text-end">{normal}</td>
                        </tr>
                        <tr> 
                            <td className="text-[14px] font-[600] ">Broken Assets:</td>
                            <td className="text-[14px] font-[600] text-end">{broken}</td>
                        </tr>
                        <tr> 
                            <td className="text-[14px] font-[600] ">Total Assets:</td>
                            <td className="text-[14px] font-[600] text-end">{total}</td>
                        </tr>
                    </tbody>
                </table>
            </dix>
        </div>
    )
}
const Detail = () =>{
    const {id} = useParams();
    const [data,setData] = useState(res[id])

    return (
        <>
            {/* <Room name="Phòng A101" normal={20} broken={5} total={25} /> */}
            <BuildingDetail />
        </>
    )
}
export default Detail;