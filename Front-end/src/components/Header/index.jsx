import logo from '../../assets/logo.svg'
// import bell from '../../assets/mdi_bell.svg'
import logout from '../../assets/logout.svg'
import changepw from '../../assets/changePW.svg'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const avt = useRef(null);
    const navigate = useNavigate();
    const handlePopUp = ()=>{
        if (!isOpen){
        setIsOpen(true)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && (!popupRef.current.contains(event.target) && !avt.current.contains(event.target))) {
            setIsOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate('/login')
    }
    return (
        <div className='h-[15vh] bg-[#fdfdfd] flex justify-between px-[30px] py-[10px] shadow-md' >
            <div className='flex'>
                <img src={logo} alt="" />
                <div className='w-[200px] font-[700] text-[25px] text-[#0388B4] ml-[20px]'>Asset Management System</div>
            </div>
            <div className='flex items-center gap-[50px] relative'>
                {/* <img
                    src={bell}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt="img"
                /> */}
                <img
                    onClick={handlePopUp}
                    ref = {avt}
                    src="https://picsum.photos/200/300"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt="img"
                />
                {isOpen&& (
                <div ref={popupRef} className='absolute bg-white top-[100%] right-[20%] p-[20px] rounded-b-[30px] rounded-tl-[30px] z-[5] shadow-black/20 w-fit border border-black'>
                    <div  className='flex gap-[10px] w-fit mr-[20px] cursor-pointer'>
                        <img src={changepw} alt="" />
                        <span className='font-[600] text[16px] whitespace-nowrap min-w-fit'>Change password</span>
                    </div>
                    <div className='flex gap-[10px] mt-[10px] cursor-pointer' onClick={handleLogout}>
                        <img src={logout} alt="" />
                        <span className='font-[600] text[16px] '>Logout</span>
                    </div>
                </div>)}
                

            </div>
        </div>
    )
}
export default Header;