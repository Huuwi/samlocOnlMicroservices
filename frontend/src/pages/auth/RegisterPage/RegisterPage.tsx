import React, { useState } from "react";
import axios from "axios";
import { envVars } from "../../../constants";
import { User, Lock, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !nickName) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        try {
            await axios.post(
                envVars.VITE_API_GATE_WAY_URL + "/userService/api/register",
                { username, password, nickName },
                { withCredentials: true }
            );
            window.location.href = "/characterMix";
        } catch (err) {
            setError("Đăng ký không thành công");
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
            <div
                className="relative bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl px-12 py-14 w-full max-w-xl flex flex-col items-center border border-yellow-400/30"
                style={{
                    boxShadow: "0 0 40px 10px rgba(255, 215, 0, 0.15)",
                    borderWidth: 2,
                    borderColor: "#FFD70080",
                    gap: "50px",
                    minHeight: "500px",
                    justifyContent: "center",
                }}
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-yellow-400 via-orange-400 to-yellow-500 rounded-full p-2 shadow-lg">
                    <img
                        src="/images/commonImgs/coin.png"
                        alt="Logo"
                        className="h-28 w-28 object-contain"
                    />
                </div>
                <h2 className="mt-20 text-3xl font-extrabold tracking-wider text-yellow-300 drop-shadow-lg font-serif uppercase">
                    Register
                </h2>
                <div className="w-full relative mt-8">
                    <input
                        style={{ height: "54px" }}
                        className="w-full p-4 pl-14 rounded-xl bg-white/20 text-white placeholder-yellow-200/70 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400/80 border border-yellow-400/20 transition"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="w-full relative mt-4">
                    <input
                        style={{ height: "54px" }}
                        className="w-full p-4 pl-14 rounded-xl bg-white/20 text-white placeholder-yellow-200/70 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400/80 border border-yellow-400/20 transition"
                        placeholder="Nickname"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                </div>
                <div className="w-full relative mt-4">
                    <input
                        style={{ height: "54px" }}
                        type="password"
                        className="w-full p-4 pl-14 rounded-xl bg-white/20 text-white placeholder-yellow-200/70 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400/80 border border-yellow-400/20 transition"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && (
                    <p className="text-red-400 text-base font-semibold mt-2 drop-shadow">
                        {error}
                    </p>
                )}
                <button
                    onClick={handleRegister}
                    className="w-full py-4 mt-8 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white font-extrabold text-lg tracking-wider shadow-lg hover:from-yellow-500 hover:to-orange-600 hover:scale-105 transition-all duration-300 border-2 border-yellow-300/60"
                    style={{
                        textShadow: "0 2px 8px #00000080",
                        boxShadow: "0 0 20px 2px #FFD70080",
                    }}
                >
                    Register
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 text-yellow-300 underline hover:text-orange-400 transition"
                >
                    Đã có tài khoản? Đăng nhập
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;