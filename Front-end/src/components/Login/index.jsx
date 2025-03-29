import { useState } from 'react';
// import hcmutbg from '../../assets/hcmut_bg.png';
import hcmutbg from '../../assets/bg-hcmut.svg'
import { useNavigate } from 'react-router-dom';
import eye from '../../assets/eye.svg'
import eyeBlind from '../../assets/eye-blind.svg'
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode"

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPW, setShowPW] = useState(false);
    const handleShowPassWord = () => {
        setShowPW(!showPW)
    }
    // Hàm gọi API lấy dữ liệu người dùng
    const handleLogin = async () => {
        const form = {
            username: userName,
            password: password
        };

        if (!form.username) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Please enter username!" });
            return;
        }
        if (!form.password) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Please enter password!" });
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                Swal.fire({ icon: "error", title: "Oops...", text: "Incorrect username or password!" });
                throw new Error("Login failed");
            }

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("TOKEN", data.result.token);
                // Giải mã token để lấy userId
                const decodedToken = jwtDecode(data.result.token);
                const userId = decodedToken.accountId; // Thay đổi theo key thực tế trong token

                // Lưu userId vào localStorage
                localStorage.setItem("userId", userId);

                navigate("/home");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="relative h-screen flex justify-center items-center" style={{ backgroundImage: `url(${hcmutbg})`, height: '100vh', width: '100vw', backgroundSize: 'cover' }}>
            <div
                className="relative flex gap-[10px] w-120 h-110 flex-col rounded-xl bg-clip-border text-gray-700 py-[20px] bg-[rgba(255,255,255,0.13)] backdrop-blur-[5px] shadow-[0_0_40px_#5BA1F2]"
            >
                <h3
                    className="block font-sans text-3xl font-bold leading-snug tracking-normal text-[#5BA1F2] text-center antialiased"
                >
                    SIGN IN
                </h3>
                <p className='text-center font-[500]'>Sign in to your account</p>
                <div className="flex flex-col gap-[20px] p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type="text"
                            placeholder=""
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#5BA1F2] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#5BA1F2] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                            Username
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPW ? 'text' : 'password'}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#5BA1F2] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#5BA1F2] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                            Password
                        </label>
                        <img src={!showPW ? eye : eyeBlind} onClick={handleShowPassWord} className='absolute top-1.5 right-2' alt="" />

                    </div>
                    <a href="/forgot-password" className="text-blue-400 text-[16px] transition hover:underline">
                        Forgot your password?
                    </a>
                </div>
                {/* <Link></Link>
                <link className="text-blue-400 text-sm transition hover:underline" href="#" /> */}

                <div className="p-6 pt-0">
                    <button
                        data-ripple-light="true"
                        onClick={handleLogin}
                        type="button"
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-[#21107a] to-[#5BA1F2] py-3 px-6 text-center align-middle font-sans text-[16px] font-bold uppercase text-white shadow-md shadow-[#21107a] transition-all hover:shadow-lg hover:shadow-[#5BA1F2] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Sign In
                    </button>
                    <div className="mt-4 text-center text-[16px] text-black">
                        <p>
                            By signing in, you agree to our
                            <a href="#" className="text-blue-400 transition px-[3px] hover:underline"
                            >Terms</a
                            >
                            and
                            <a href="#" className="text-blue-400 transition px-[3px] hover:underline"
                            >Privacy Policy</a
                            >.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Login;