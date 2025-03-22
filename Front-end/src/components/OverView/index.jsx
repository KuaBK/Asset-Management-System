import "./style.css"
import builderror from '../../assets/buildError.jpg';
import build1 from '../../assets/build.png';
import { useState } from 'react';
const OverView = () => {
    const [flipped, setFlipped] = useState(false);
    const progress =0.2;
    const func1 = () => {
        setFlipped(!flipped); // Lật thẻ khi gọi hàm
    };
    const quantity = 100;
    const error = 15;
    return (
        <div className='w-[100vw] h-[100vh] '>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div className="flip-card-front relative rounded-[15px] bg-white p-[20px] ">
                        <div className="text-[32px] font-bold text-center ">BK-H1</div>
                        <img className='h[90%]' src={(error) ? builderror : build1} alt="" />
                        <table className='w-[100%] '>
                            <tbody>
                                <tr>
                                    <td className='text-start font-semibold'>
                                        Số thiết bị:
                                    </td>
                                    <td className='text-end font-semibold'>{quantity}</td>
                                </tr>
                                <tr>
                                    <td className='text-start font-semibold'>
                                        Số thiết bị hỏng:
                                    </td>
                                    <td className='text-end font-semibold'>{error}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flip-card-back">
                        <label className="text-black text-sm">Số giây</label>
                        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-400 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OverView;