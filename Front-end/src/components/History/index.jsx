import { useEffect, useState } from 'react';
import fix from '../../assets/screwdriver_wrench.svg'

const History = () => {
    const [log, setLog] = useState([]);
    const parseDate = (timeString) => {
        const [date, time] = timeString.split(" ");
        const [day, month, year] = date.split("-");
        return new Date(`${year}-${month}-${day}T${time}`);
      };
    function formatDateTime(time) {
        const [datePart, timePart] = time.split(" ");
        const [day, month, year] = datePart.split("-");
        const formattedDate = `Ngày ${parseInt(day)} tháng ${parseInt(month)} ${year}`;
        const formattedTime = timePart.substring(0, 5);
        return { formattedDate, formattedTime };
    }
    function formatText(text) {
        return text
            .toLowerCase() // Chuyển thành chữ thường: "electric_light"
            .replace(/_/g, " ") // Thay "_" bằng khoảng trắng: "electric light"
            .replace(/\b\w/g, char => char.toUpperCase()); // Viết hoa chữ cái đầu: "Electric Light"
    }
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        const fetchLog = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/asset-log", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {

                    throw new Error("Fetch log failed");
                }

                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    setLog(data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)))
                }
                // console.log("Fetch success:", listCard);
                // Xử lý lưu token hoặc điều hướng nếu cần
            } catch (error) {
                console.error("Error fetch:", error);
            }
        };
        fetchLog();
    }, [])
    const renderTypeLabel = (list) => {
        switch (list.type) {
            case "CREATE":
                return (<div className='bg-green-500 text-white px-[10px] py-[5px] font-semibold'>{list.type}</div>)
            case "TOGGLE":
                return (<div className='bg-purple-500 text-white px-[10px] py-[5px] font-semibold'>{list.type}</div>)
            case "UPDATE":
                return (<div className='bg-blue-500 text-white px-[10px] py-[5px] font-semibold'>{list.type}</div>)
            case "DELETE":
                return (<div className='bg-red-500 text-white px-[10px] py-[5px] font-semibold'>{list.type}</div>)
        }
    }
    return (
        <div className="m-auto w-[80%] min-h-[90%] h-[90%] bg-white rounded-[30px] px-[3%] py-[30px]">
            <div className='text-[32px] font-bold text-black '>Repair Log</div>
            <div className='overflow-auto h-[90%] flex flex-col gap-[10px] p-[10px]'>
                {log?.map(list => (
                    <div key={list.id} className='border-b border-black'>
                        <div className="font-bold text-[#0388B4] text-[20px] ">{formatDateTime(list.timestamp).formattedDate}</div>
                        <div className="flex items-center gap-[5px] justify-between">
                            <div className="opacity-[60%]">{formatDateTime(list.timestamp).formattedTime}</div>
                            {/* <img className='' src={fix} alt="" /> */}
                            <div>{renderTypeLabel(list)}</div>

                            <div className='w-[50%] '>
                                <div className='text-[25px] truncate text-black  font-semibold'>{formatText(list.assetType)} - {list.assetSeries}</div>
                                <div className='truncate opacity-70'>{list.action}</div>
                            </div>
                            <div className='w-[30%] truncate text-end'>{list.email}</div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
export default History;