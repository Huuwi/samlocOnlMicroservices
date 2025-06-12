import React, { useState } from 'react';
import { User, Lock } from 'lucide-react'; // icon đẹp hơn từ lucide
import axios from "axios"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    async function fetchLogin() {
        const res = await axios.post(`${import.meta.env.VITE_API_GATE_WAY_URL}/userService/api/login`,
            {
                username,
                password
            },
            {
                withCredentials: true
            }
        )

        console.log(res);

    }

    const handleLogin = () => {
        if (!username || !password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        fetchLogin()

        console.log('Đăng nhập với:', username, password);
        setError('');
    };

    return (
        <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 h-screen w-screen flex justify-center items-center'>
            <div className='bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[90%] flex flex-col items-center space-y-6 border border-white/20 min-h-2/3 ' style={{ width: "700px", justifyContent: "center", gap: "30px" }}>
                <img src='/images/commonImgs/coin.png' alt="Logo" className='h-44' style={{}} />

                <h2 className='text-white text-2xl font-semibold tracking-wide'>Welcome Back</h2>

                <div className='w-full relative'>
                    <input
                        style={{ height: "50px" }}
                        className="w-full p-3 pl-12 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="         Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <User className='absolute left-4 top-3 text-white/70 h-5 w-5' />
                </div>

                <div className='w-full relative'>
                    <input
                        style={{ height: "50px" }}
                        type="password"
                        className="w-full p-3 pl-12 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="         Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock className='absolute left-4 top-3 text-white/70 h-5 w-5' />
                </div>

                {error && <p className='text-red-400 text-sm'>{error}</p>}

                <button
                    onClick={handleLogin}
                    className='w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold hover:from-yellow-500 hover:to-orange-600 transition duration-300'
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
