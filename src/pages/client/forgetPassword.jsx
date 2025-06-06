import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailsent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendEmail(){
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/sendMail",{
            email:email
        }).then(
            (response)=>{
                console.log(response.data);
                setEmailsent(true);
                toast.success("Email sent successfully")
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error("Email sending failed")
            }
        );
    }

    function changePassword(){
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/changePW",{
            email:email,
            otp:otp,
            password:password
        }).then(
            (response)=>{
                console.log(response.data);
                toast.success("Password reset successfully");
                window.location.href = "/login";
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error("Password reset failed");
                window.location.reload();
            }
        );
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            {
                emailSent?
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-[400px]">
                        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                Enter OTP:
                            </label>
                            <input
                                type="text"
                                id="otp"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                        onClick={changePassword}
                            type="submit"
                            className="w-full bg-primary-dark text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300 cursor-pointer"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>

                :
            <div className="max-w-md w-full p-6 font-sans bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>
                <form>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 mt-4">
                        Enter your email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={
                            (e) => 
                                setEmail(e.target.value)
                        }
                        value={email}
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary-dark text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault(); // prevent form submission
                            sendEmail();
                        }}
                    >
                        Send OTP
                    </button>
                </form>
            </div>
}
        </div>
    );
}
