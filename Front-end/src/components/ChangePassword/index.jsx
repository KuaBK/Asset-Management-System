import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import hcmutbg from '../../assets/bg-hcmut.svg';
import eye from '../../assets/eye.svg';
import eyeBlind from '../../assets/eye-blind.svg';

const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const ChangePassword = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPW, setShowOldPW] = useState(false);
    const [showNewPW, setShowNewPW] = useState(false);
    const [showConfirmPW, setShowConfirmPW] = useState(false);
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");

    const handleChangePassword = async () => {
        var token = localStorage.getItem("TOKEN");
        const userId = localStorage.getItem("userId");

        if (!userId) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User ID not found. Please log in again!"
            });
            return;
        }

        if (!oldPassword || !newPassword || !confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all fields!"
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "New password and confirm password do not match!"
            });
            return;
        }

        if (captchaInput !== captcha) {
            Swal.fire({ icon: "error", title: "Error", text: "Invalid CAPTCHA, please try again!" });
            setCaptcha(generateCaptcha());
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/account/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
            });

            if (!response.ok) {
                throw new Error("Failed to change password! Please check your connect with database.");
            }

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Password changed successfully! Please login again"
            }).then(() => navigate("/login"));
        } catch (error) {
            console.error("Error changing password:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to change password! Please check your current password and try again."
            });
        }
    };

    return (
        <div className="relative h-screen flex justify-center items-center" style={{ backgroundImage: `url(${hcmutbg})`, height: '100vh', width: '100vw', backgroundSize: 'cover' }}>
            <div className="relative flex gap-[10px] w-120 h-110 flex-col rounded-xl bg-clip-border text-gray-700 py-[20px] bg-[rgba(255,255,255,0.13)] backdrop-blur-[5px] shadow-[0_0_40px_#5BA1F2]">
                <h3 className="block font-sans text-3xl font-bold leading-snug tracking-normal text-[#5BA1F2] text-center antialiased">CHANGE PASSWORD</h3>
                <div className="flex flex-col gap-[20px] p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type={showOldPW ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old Password"
                            className="peer h-full w-full rounded-md border px-3 py-3"
                        />
                        <img src={showOldPW ? eyeBlind : eye} onClick={() => setShowOldPW(!showOldPW)} className='absolute top-1.5 right-2 cursor-pointer' alt="Toggle Password" />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type={showNewPW ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="peer h-full w-full rounded-md border px-3 py-3"
                        />
                        <img src={showNewPW ? eyeBlind : eye} onClick={() => setShowNewPW(!showNewPW)} className='absolute top-1.5 right-2 cursor-pointer' alt="Toggle Password" />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type={showConfirmPW ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className="peer h-full w-full rounded-md border px-3 py-3"
                        />
                        <img src={showConfirmPW ? eyeBlind : eye} onClick={() => setShowConfirmPW(!showConfirmPW)} className='absolute top-1.5 right-2 cursor-pointer' alt="Toggle Password" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3 m-3">
                    <div className="flex items-center justify-between bg-gray-200 rounded-md px-4 py-2 w-full">
                        <span className="font-mono text-xl font-bold tracking-widest text-gray-800 select-none">{captcha}</span>
                        <button
                            onClick={() => setCaptcha(generateCaptcha())}
                            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all"
                            title="Refresh CAPTCHA"
                        >
                            ↻
                        </button>
                    </div>
                    <input
                        type="text"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Enter CAPTCHA"
                        className="w-full rounded-md border px-3 py-2 text-center text-lg font-semibold tracking-wider"
                    />
                </div>
                <div className="p-6 pt-0">
                    <button onClick={handleChangePassword} className="block w-full rounded-lg bg-gradient-to-tr from-[#21107a] to-[#5BA1F2] py-3 px-6 text-center font-sans text-[16px] font-bold uppercase text-white shadow-md shadow-[#21107a] transition-all hover:shadow-lg hover:shadow-[#5BA1F2] active:opacity-[0.85]">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
