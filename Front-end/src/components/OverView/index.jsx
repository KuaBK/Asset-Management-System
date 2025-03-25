import "./style.css"
import builderror from '../../assets/buildError.jpg';
import build1 from '../../assets/build.png';
import asset from '../../assets/asset.svg'
import { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
var res = {
    data: [
        {
            id: 1,
            name: "BKB1",
            assets: {
                totalQuan: 50,
                brokenQuan: 5,
            },
            tables: {
                total: 20,
                broken: 2,
            },
            chairs: {
                total: 30,
                broken: 3,
            },
            blackboards: {
                total: 5,
                broken: 1,
            },
            projectors: {
                total: 3,
                broken: 1,
            },
            projectorScreens: {
                total: 3,
                broken: 0,
            },
            fans: {
                total: 10,
                broken: 1,
            },
            loudspeakers: {
                total: 4,
                broken: 0,
            },
            lights: {
                total: 15,
                broken: 2,
            }
        },
        {
            id: 2,
            name: "BKB2",
            assets: {
                totalQuan: 60,
                brokenQuan: 6,
            },
            tables: {
                total: 25,
                broken: 3,
            },
            chairs: {
                total: 35,
                broken: 4,
            },
            blackboards: {
                total: 6,
                broken: 1,
            },
            projectors: {
                total: 4,
                broken: 1,
            },
            projectorScreens: {
                total: 4,
                broken: 1,
            },
            fans: {
                total: 12,
                broken: 2,
            },
            loudspeakers: {
                total: 5,
                broken: 1,
            },
            lights: {
                total: 18,
                broken: 3,
            }
        },
        {
            id: 3,
            name: "BKB3",
            assets: {
                totalQuan: 55,
                brokenQuan: 4,
            },
            tables: {
                total: 22,
                broken: 2,
            },
            chairs: {
                total: 33,
                broken: 2,
            },
            blackboards: {
                total: 7,
                broken: 1,
            },
            projectors: {
                total: 3,
                broken: 0,
            },
            projectorScreens: {
                total: 3,
                broken: 0,
            },
            fans: {
                total: 9,
                broken: 1,
            },
            loudspeakers: {
                total: 6,
                broken: 0,
            },
            lights: {
                total: 14,
                broken: 1,
            }
        },
        {
            id: 4,
            name: "BKB4",
            assets: {
                totalQuan: 70,
                brokenQuan: 7,
            },
            tables: {
                total: 30,
                broken: 4,
            },
            chairs: {
                total: 40,
                broken: 5,
            },
            blackboards: {
                total: 8,
                broken: 2,
            },
            projectors: {
                total: 5,
                broken: 1,
            },
            projectorScreens: {
                total: 5,
                broken: 1,
            },
            fans: {
                total: 15,
                broken: 2,
            },
            loudspeakers: {
                total: 7,
                broken: 1,
            },
            lights: {
                total: 20,
                broken: 4,
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
const Card = ({ name, totalQuan, brokenQuan, tableTotal, tableBroken, chairTotal, chairBroken, BBoardTotal, BBoardBroken, ProjectorsTotal, ProjectorsBroken, ProScreenTotal, ProScreenBroken, fanTotal, fanBroken, loudSpeakerTotal, loudSpeakerBroken, lightTotal, lightBroken }) => {
    return (
        <div class="flip-card">
            <div class="flip-card-inner">
                <div className="flip-card-front relative rounded-[15px] bg-white p-[20px] ">
                    <div className="text-[32px] font-bold text-center ">{name}</div>
                    <img className='h[90%]' src={(((totalQuan-brokenQuan) / totalQuan) < 0.9) ? builderror : build1} alt="" />
                    <table className='w-[100%] '>
                        <tbody>
                            <tr>
                                <td className='text-start font-semibold'>
                                    Số thiết bị:
                                </td>
                                <td className='text-end font-semibold'>{totalQuan}</td>
                            </tr>
                            <tr>
                                <td className='text-start font-semibold'>
                                    Số thiết bị hỏng:
                                </td>
                                <td className='text-end font-semibold'>{brokenQuan}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flip-card-back">
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
    return (
        <div className='w-[100%] h-[100%] '>
            <div className="flex justify-end gap-[50px] mr-[100px]">
            <div className="h-[150px] w-[250px] rounded-[30px] bg-[rgb(0,185,219)] py-[20px] px-[30px] flex flex-col justify-around">
                <div className="font-bold text-white text[20px] ">TOTAL ASSETS</div>
                <div className="flex justify-around">
                    <img src={asset} alt="" />
                    <div className="font-bold text-white text-[32px] ">{res.totalAssets}</div>
                </div>
            </div>
            <div className="h-[150px] w-[250px] rounded-[30px] bg-[#8cf591] py-[20px] px-[30px] flex flex-col justify-around">
                <div className="font-bold text-white text[20px] ">NORMAL ASSETS</div>
                <div className="flex justify-around">
                    <img src={asset} alt="" />
                    <div className="font-bold text-white text-[32px] ">{res.normalAssets}</div>
                </div>
            </div>
            <div className="h-[150px] w-[250px] rounded-[30px] bg-[#ff6a6a] py-[20px] px-[30px] flex flex-col justify-around">
                <div className="font-bold text-white text[20px] ">BROKEN ASSETS</div>
                <div className="flex justify-around">
                    <img src={asset} alt="" />
                    <div className="font-bold text-white text-[32px] ">{res.totalAssets-res.normalAssets}</div>
                </div>
            </div>
            </div>
            <div className="flex justify-around mt-[50px]">
                {listCard.map((card) => (
                <Card
                    key={card.id}
                    name={card.name}
                    totalQuan={card.assets.totalQuan}
                    brokenQuan={card.assets.brokenQuan}
                    tableTotal={card.tables.total}
                    tableBroken={card.tables.broken}
                    chairTotal={card.chairs.total}
                    chairBroken={card.chairs.broken}
                    BBoardTotal={card.blackboards.total}
                    BBoardBroken={card.blackboards.broken}
                    ProjectorsTotal={card.projectors.total}
                    ProjectorsBroken={card.projectors.broken}
                    ProScreenTotal={card.projectorScreens.total}
                    ProScreenBroken={card.projectorScreens.broken}
                    fanTotal={card.fans.total}
                    fanBroken={card.fans.broken}
                    loudSpeakerTotal={card.loudspeakers.total}
                    loudSpeakerBroken={card.loudspeakers.broken}
                    lightTotal={card.lights.total}
                    lightBroken={card.lights.broken}
                />
                ))}
            </div>
            


        </div>
    )
};
export default OverView;