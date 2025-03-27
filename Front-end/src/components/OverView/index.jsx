import "./style.css"
import builderror from '../../assets/buildError.jpg';
import build1 from '../../assets/hcmut-icon.svg';
import asset from '../../assets/asset.svg'
import { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
var res = {
    data: [
        {
            "id": 1,
            "name": "H1",
            "totalRooms": 4,
            "assets": {
                "totalQuan": 20,
                "brokenQuan": 2
            },
            "teacherChair": {
                "total": 6,
                "broken": 1
            },
            "studentDesk": {
                "total": 2,
                "broken": 0
            },
            "blackboard": {
                "total": 2,
                "broken": 0
            },
            "projector": {
                "total": 3,
                "broken": 0
            },
            "projectorScreen": {
                "total": 1,
                "broken": 1
            },
            "ceilingFan": {
                "total": 5,
                "broken": 0
            },
            "loudspeaker": {
                "total": 0,
                "broken": 0
            },
            "electricLight": {
                "total": 1,
                "broken": 0
            }
        },
        {
            "id": 2,
            "name": "H2",
            "totalRooms": 4,
            "assets": {
                "totalQuan": 10,
                "brokenQuan": 1
            },
            "teacherChair": {
                "total": 1,
                "broken": 0
            },
            "studentDesk": {
                "total": 2,
                "broken": 0
            },
            "blackboard": {
                "total": 1,
                "broken": 0
            },
            "projector": {
                "total": 1,
                "broken": 0
            },
            "projectorScreen": {
                "total": 1,
                "broken": 1
            },
            "ceilingFan": {
                "total": 3,
                "broken": 0
            },
            "loudspeaker": {
                "total": 1,
                "broken": 0
            },
            "electricLight": {
                "total": 0,
                "broken": 0
            }
        },
        {
            "id": 3,
            "name": "H3",
            "totalRooms": 4,
            "assets": {
                "totalQuan": 8,
                "brokenQuan": 4
            },
            "teacherChair": {
                "total": 0,
                "broken": 0
            },
            "studentDesk": {
                "total": 1,
                "broken": 1
            },
            "blackboard": {
                "total": 1,
                "broken": 0
            },
            "projector": {
                "total": 1,
                "broken": 0
            },
            "projectorScreen": {
                "total": 1,
                "broken": 0
            },
            "ceilingFan": {
                "total": 0,
                "broken": 0
            },
            "loudspeaker": {
                "total": 2,
                "broken": 2
            },
            "electricLight": {
                "total": 2,
                "broken": 1
            }
        }
    ],
    totalBuildings: 4,
    totalAssets: 237,
    normalAssets: 200
};


const Fraction = ({ numerator, denominator }) => {
    return (
        <span className="translate-y-[-10px]">
            <sup className="text-[14px] font-semibold">{numerator}</sup>/<sub className="text-[14px] font-semibold">{denominator}</sub>
        </span>
    );
};
const CustomProgressBar = ({
    completed = 90,
    maxCompleted = 100,
    className = '', // Class mặc định
    bgColor = "#5CFF66", // Màu nền mặc định
    baseBgColor = "#f2f2f2",
    height = "10px",
    width = "95%",
    borderRadius = "50px",
    labelAlignment = "center",
    isLabelVisible = false,
    labelColor = "#555",
    labelSize = "0.8rem",
    transitionDuration = "2s",
    transitionTimingFunction = "ease",
    animateOnRender = true,
}) => {
    return (
        <ProgressBar
            className={`custom-progress-bar ${className}`} // Kết hợp class
            completed={completed}
            maxCompleted={maxCompleted}
            bgColor={bgColor}
            baseBgColor={baseBgColor}
            height={height}
            width={width}
            borderRadius={borderRadius}
            labelAlignment={labelAlignment}
            isLabelVisible={isLabelVisible}
            labelColor={labelColor}
            labelSize={labelSize}
            transitionDuration={transitionDuration}
            transitionTimingFunction={transitionTimingFunction}
            animateOnRender={animateOnRender}
        // customLabel={`${completed}`} // Chỉ hiện giá trị mà không có %
        // labelClassName={`font-bold px-[10px]`} // Add custom label class
        />
    );
};
// const ProgressBar: React.FC<ProgressBarProps>;
// export default CustomProgressBar;
const Card = ({ name, totalQuan, totalRoom, brokenQuan, tableTotal, tableBroken, chairTotal, chairBroken, BBoardTotal, BBoardBroken, ProjectorsTotal, ProjectorsBroken, ProScreenTotal, ProScreenBroken, fanTotal, fanBroken, loudSpeakerTotal, loudSpeakerBroken, lightTotal, lightBroken }) => {
    return (
        <div class="flip-card">
            <div class="flip-card-inner">
                <div className="flip-card-front relative flex flex-col justify-between rounded-[15px] bg-white p-[20px] ">
                    <div className="text-[32px] font-bold text-center ">{name}</div>
                    <img className='h[90%]' src={(((totalQuan - brokenQuan) / totalQuan) < 0.9) ? build1 : build1} alt="" />
                    <table className='w-[100%] '>
                        <tbody>
                            <tr>
                                <td className='text-start font-semibold'>
                                    Total Room:
                                </td>
                                <td className='text-end font-semibold'>{totalRoom}</td>
                            </tr>
                            <tr>
                                <td className='text-start font-semibold'>
                                    Total Assets:
                                </td>
                                <td className='text-end font-semibold'>{totalQuan}</td>
                            </tr>
                            <tr>
                                <td className='text-start font-semibold'>
                                    Broken Assets:
                                </td>
                                <td className='text-end font-semibold'>{brokenQuan}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flip-card-back py-[10px] bg-white">
                    <div className=''>
                        <p className='text-start ml-[10%]'>Projectors</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((ProjectorsTotal - ProjectorsBroken) / ProjectorsTotal) * 100}
                                bgColor={((ProjectorsTotal - ProjectorsBroken) / ProjectorsTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Projectors"}
                            />
                            <Fraction numerator={(ProjectorsTotal - ProjectorsBroken)} denominator={ProjectorsTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Projection screens</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((ProScreenTotal - ProScreenBroken) / ProScreenTotal) * 100}
                                bgColor={((ProScreenTotal - ProScreenBroken) / ProScreenTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Projection screens"}
                            />
                            <Fraction numerator={(ProScreenTotal - ProScreenBroken)} denominator={ProScreenTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Table</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((tableTotal - tableBroken) / tableTotal) * 100}
                                bgColor={((tableTotal - tableBroken) / tableTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Table"}
                            />
                            <Fraction numerator={(tableTotal - tableBroken)} denominator={tableTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Chair</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((chairTotal - chairBroken) / chairTotal) * 100}
                                bgColor={((chairTotal - chairBroken) / chairTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Chair"}
                            />
                            <Fraction numerator={(chairTotal - chairBroken)} denominator={chairTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Blackboards</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((BBoardTotal - BBoardBroken) / BBoardTotal) * 100}
                                bgColor={((BBoardTotal - BBoardBroken) / BBoardTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Blackboards"}
                            />
                            <Fraction numerator={(BBoardTotal - BBoardBroken)} denominator={BBoardTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Ceiling fans</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((fanTotal - fanBroken) / fanTotal) * 100}
                                bgColor={((fanTotal - fanBroken) / fanTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Ceiling fans"}
                            />
                            <Fraction numerator={(fanTotal - fanBroken)} denominator={fanTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Loud speakers</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((loudSpeakerTotal - loudSpeakerBroken) / loudSpeakerTotal) * 100}
                                bgColor={((loudSpeakerTotal - loudSpeakerBroken) / loudSpeakerTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Loud speakers"}
                            />
                            <Fraction numerator={(loudSpeakerTotal - loudSpeakerBroken)} denominator={loudSpeakerTotal} />
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-start ml-[10%]'>Electric lights</p>
                        <div className="flex justify-center w-[80%] m-auto ">
                            <CustomProgressBar
                                className='w-[90%]'
                                completed={((lightTotal - lightBroken) / lightTotal) * 100}
                                bgColor={((lightTotal - lightBroken) / lightTotal) * 100 < 90 ? "#FF665C" : "#5CFF66"}
                                label={"Electric lights"}
                            />
                            <Fraction numerator={(lightTotal - lightBroken)} denominator={lightTotal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OverView = () => {
    // const [flipped, setFlipped] = useState(false);
    // const progress = 0.2;
    // const func1 = () => {
    //     setFlipped(!flipped); // Lật thẻ khi gọi hàm
    // };

    const [listCard, setListCard] = useState(res.data);
    const [assetTotal, setAssetTotal] = useState({
        NormalAssets: 0,
        TotalBuildings: 0,
        TotalAssets: 0
    });
    useEffect(() => {
        const fetchAssetSummary = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/buildings/assets-summary");

                if (!response.ok) {

                    throw new Error("Fetch asset summary failed");
                }

                const data = await response.json();
                if (response.ok) {
                    setListCard(data.result)
                }
                console.log("Fetch success:", listCard);
                // Xử lý lưu token hoặc điều hướng nếu cần
            } catch (error) {
                console.error("Error fetch:", error);
            }
        };
        const fetchAssetTotal = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/buildings/total/infor");

                if (!response.ok) {

                    throw new Error("Fetch asset summary failed");
                }

                const data = await response.json();
                if (response.ok) {
                    setAssetTotal(data)
                    console.log("Fetch success:", assetTotal);
                }
                // Xử lý lưu token hoặc điều hướng nếu cần
            } catch (error) {
                console.error("Error fetch:", error);
            }
        };
        fetchAssetSummary();
        fetchAssetTotal();
    }, [])
    return (
        <div className='w-[100%] h-[100%] '>
            <div className="flex justify-end gap-[50px] mr-[50px]">
                <div className="h-[150px] w-[250px] rounded-[30px] bg-[#0388B4] py-[20px] px-[30px] flex flex-col justify-around" >
                    <div className="font-bold text-white text[20px] ">TOTAL ASSETS</div>
                    <div className="flex justify-around">
                        <img src={asset} alt="" />
                        <div className="font-bold text-white text-[32px] ">{assetTotal.TotalAssets}</div>
                    </div>
                </div>
                <div className="h-[150px] w-[250px] rounded-[30px] bg-[#8cf591] py-[20px] px-[30px] flex flex-col justify-around">
                    <div className="font-bold text-white text[20px] ">NORMAL ASSETS</div>
                    <div className="flex justify-around">
                        <img src={asset} alt="" />
                        <div className="font-bold text-white text-[32px] ">{assetTotal.NormalAssets}</div>
                    </div>
                </div>
                <div className="h-[150px] w-[250px] rounded-[30px] bg-[#ff6a6a] py-[20px] px-[30px] flex flex-col justify-around">
                    <div className="font-bold text-white text[20px] ">BROKEN ASSETS</div>
                    <div className="flex justify-around">
                        <img src={asset} alt="" />
                        <div className="font-bold text-white text-[32px] ">{assetTotal.TotalAssets - assetTotal.NormalAssets}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-between mt-[50px] gap-[20px] mx-[50px]">
                {listCard.map((card) => (
                    <Card
                        key={card.id}
                        name={card.name}
                        totalRoom={card.totalRooms}
                        totalQuan={card.assets.totalQuan}
                        brokenQuan={card.assets.brokenQuan}
                        tableTotal={card.studentDesk.total}
                        tableBroken={card.studentDesk.broken}
                        chairTotal={card.teacherChair.total}
                        chairBroken={card.teacherChair.broken}
                        BBoardTotal={card.blackboard.total}
                        BBoardBroken={card.blackboard.broken}
                        ProjectorsTotal={card.projector.total}
                        ProjectorsBroken={card.projector.broken}
                        ProScreenTotal={card.projectorScreen.total}
                        ProScreenBroken={card.projectorScreen.broken}
                        fanTotal={card.ceilingFan.total}
                        fanBroken={card.ceilingFan.broken}
                        loudSpeakerTotal={card.loudspeaker.total}
                        loudSpeakerBroken={card.loudspeaker.broken}
                        lightTotal={card.electricLight.total}
                        lightBroken={card.electricLight.broken}
                    />
                ))}
            </div>


        </div>
    )
};
export default OverView;