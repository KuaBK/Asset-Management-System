import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import hcmutbg from "../../assets/bg-hcmut.svg";

Modal.setAppElement("#root");

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOtpModalOpen, setOtpModalOpen] = useState(false);
    const [isResetModalOpen, setResetModalOpen] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Please enter your email!" });
            return;
        }
        try {
            const response = await fetch(`https://asset-management-system-95e0.onrender.com/api/account/forgot-password?email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json(); // Lấy dữ liệu từ API

            if (!response.ok) {
                throw new Error(data.message || "Email not found!"); // Lấy thông báo lỗi từ server
            }

            Swal.fire({ icon: "success", title: "Success", text: "OTP has been sent to your email." });
            setOtpModalOpen(true);
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        }
    };

    const handleConfirmOtp = async () => {
        try {
            const response = await fetch(
                `https://asset-management-system-95e0.onrender.com/api/account/confirm-otp?email=${email}&otp=${otp}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (!response.ok) throw new Error("Invalid OTP!");

            Swal.fire({ icon: "success", title: "Success", text: "OTP Verified! Now reset your password." });

            setOtpModalOpen(false);
            setResetModalOpen(true);
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Passwords do not match!" });
            return;
        }
        try {
            const response = await fetch(`https://asset-management-system-95e0.onrender.com/api/account/reset-password?email=${email}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) throw new Error("Failed to reset password!");
            Swal.fire({ icon: "success", title: "Success", text: "Password has been reset successfully!" });
            navigate("/login");
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message });
        }
    };

    return (
        <div
            className="relative h-screen flex justify-center items-center"
            style={{ backgroundImage: `url(${hcmutbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex flex-col gap-4 max-w-md w-full h-auto rounded-xl bg-clip-border text-gray-700 px-6 py-8 bg-[rgba(255,255,255,0.2)] backdrop-blur-md shadow-[0_0_30px_#5BA1F2]">
                <h3 className="text-3xl font-bold text-[#5BA1F2] text-center">Forgot Password</h3>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleForgotPassword}
                    className="block w-full select-none rounded-lg bg-gradient-to-tr from-[#21107a] to-[#5BA1F2] py-3 px-6 text-center align-middle font-sans text-[16px] font-bold uppercase text-white shadow-md shadow-[#21107a] transition-all hover:shadow-lg hover:shadow-[#5BA1F2] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Send OTP
                </button>

                <a
                    href="/login"
                    className="w-full text-[#5BA1F2] text-center mt-2 hover:underline"
                >
                    Remember your password? Back to Login
                </a>
            </div>

            {/* OTP Modal */}
            <Modal
                isOpen={isOtpModalOpen}
                onRequestClose={() => setOtpModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center z-50"
            >
                <div className="relative flex flex-col gap-4 max-w-md w-full h-auto rounded-xl bg-clip-border text-gray-700 px-6 py-8 bg-[rgba(255,255,255,0.2)] backdrop-blur-md shadow-[0_0_30px_#5BA1F2]">
                    <h3 className="text-3xl font-bold text-[#5BA1F2] text-center">Enter OTP</h3>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleConfirmOtp}
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-[#21107a] to-[#5BA1F2] py-3 px-6 text-center align-middle font-sans text-[16px] font-bold uppercase text-white shadow-md shadow-[#21107a] transition-all hover:shadow-lg hover:shadow-[#5BA1F2] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Verify OTP
                    </button>
                </div>
            </Modal>

            {/* Reset Password Modal */}
            <Modal
                isOpen={isResetModalOpen}
                onRequestClose={() => setResetModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center z-50"
            >
                <div className="relative flex flex-col gap-4 max-w-md w-full h-auto rounded-xl bg-clip-border text-gray-700 px-6 py-8 bg-[rgba(255,255,255,0.2)] backdrop-blur-md shadow-[0_0_30px_#5BA1F2]">
                    <h3 className="text-3xl font-bold text-[#5BA1F2] text-center">Reset Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-[#21107a] to-[#5BA1F2] py-3 px-6 text-center align-middle font-sans text-[16px] font-bold uppercase text-white shadow-md shadow-[#21107a] transition-all hover:shadow-lg hover:shadow-[#5BA1F2] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Reset Password
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ForgotPassword;