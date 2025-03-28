import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import hcmutbg from "../../assets/bg-hcmut.svg";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [showCaptcha, setShowCaptcha] = useState(false);

    // Hàm tạo mã CAPTCHA ngẫu nhiên (gồm 6 ký tự số + chữ)
    const generateCaptcha = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleResetPassword = async () => {
        if (!email) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Please enter your email!" });
            return;
        }

        // Fake API - kiểm tra email
        if (email === "test@example.com") {
            const newCaptcha = generateCaptcha();
            setCaptcha(newCaptcha);
            setShowCaptcha(true);
            Swal.fire({ icon: "info", title: "Verification", text: "Enter the CAPTCHA to verify" });
        } else {
            Swal.fire({ icon: "error", title: "Error", text: "Email not found!" });
        }
        // api
        // try {
        //     const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email }),
        //     });

        //     const data = await response.json();

        //     if (!response.ok) {
        //         Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to send reset link!" });
        //         return;
        //     }

        //     Swal.fire({ icon: "success", title: "Success", text: "A reset link has been sent to your email." });
        //     navigate("/login");
        // } catch (error) {
        //     console.error("Error:", error);
        //     Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong!" });
        // }
    };

    const handleVerifyCaptcha = () => {
        if (captchaInput === captcha) {
            Swal.fire({ icon: "success", title: "Success", text: "Your new password is: 123" });
            navigate("/login");
        } else {
            Swal.fire({ icon: "error", title: "Error", text: "Invalid CAPTCHA, please try again!" });
            setCaptcha(generateCaptcha()); // Tạo mã mới
        }
    };

    return (
        <div className="relative h-screen flex justify-center items-center" style={{ backgroundImage: `url(${hcmutbg})`, height: '100vh', width: '100vw', backgroundSize: 'cover' }}>
            <div className="relative flex gap-[10px] w-120 h-auto flex-col rounded-xl bg-clip-border text-gray-700 py-[20px] bg-[rgba(255,255,255,0.13)] backdrop-blur-[5px] shadow-[0_0_40px_#5BA1F2]">
                <h3 className="block font-sans text-3xl font-bold leading-snug tracking-normal text-[#5BA1F2] text-center antialiased">
                    FORGOT PASSWORD
                </h3>
                <p className='text-center font-[500]'>Enter your email to receive reset instructions</p>

                <div className="flex flex-col gap-[20px] p-6">
                    {/* Input Email */}
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#5BA1F2] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#5BA1F2] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                            Email Address
                        </label>
                    </div>

                    {/* CAPTCHA Step */}
                    {showCaptcha && (
                        <div className="flex flex-col gap-3">
                            <p className="text-center font-semibold">Enter CAPTCHA to verify</p>
                            <div className="flex justify-center items-center gap-2">
                                <span
                                    className="bg-gray-200 p-2 rounded-md text-lg font-bold select-none"
                                    style={{ userSelect: "none" }}
                                    onCopy={(e) => e.preventDefault()}
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    {captcha}
                                </span>
                                <button
                                    onClick={() => setCaptcha(generateCaptcha())}
                                    className="bg-[#5BA1F2] text-white px-2 py-1 rounded-md text-sm"
                                >
                                    Refresh
                                </button>
                            </div>
                            <input
                                type="text"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                placeholder="Enter CAPTCHA"
                                className="p-2 border rounded-md text-center"
                            />
                        </div>
                    )}
                </div>

                <div className="p-6 pt-0">
                    {!showCaptcha ? (
                        <button
                            onClick={handleResetPassword}
                            className="block w-full rounded-lg bg-gradient-to-tr from-[#21107a] to-[#5BA1F2] py-3 px-6 text-white font-bold uppercase shadow-md hover:shadow-lg"
                        >
                            Send Reset Link
                        </button>
                    ) : (
                        <button
                            onClick={handleVerifyCaptcha}
                            className="block w-full rounded-lg bg-gradient-to-tr from-green-500 to-green-700 py-3 px-6 text-white font-bold uppercase shadow-md hover:shadow-lg"
                        >
                            Verify CAPTCHA
                        </button>
                    )}

                    <div className="mt-4 text-center text-[16px] text-black">
                        <p>
                            Remember your password?
                            <a href="/login" className="text-blue-400 transition px-[3px] hover:underline">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
