
const LoginPage = () => {
    return (
        <>
            <div className='bg-gradient-to-r from-black to-blue-500 h-screen w-screen flex flex-col justify-center items-center ctner' >
                <div className='bg-[radial-gradient(circle,_rgba(255,255,255,0.8),_rgba(255,255,255,0.2))] h-4/5 w-1/2 rounded-xl flex flex-col justify-center items-center ' style={{ gap: '50px' }} >
                    <img src='./public/images/commonImgs/coin.png' style={{ height: "200px", marginBottom: "120px" }} />
                    <input className="border border-gray-300 rounded-md p-2 m-2 w-3/4 h-1/15" placeholder="Username" />
                    <input type="password" className="border border-gray-300 rounded-md p-2 m-2 w-3/4 h-1/15" placeholder="Password" />
                    <button className='bg-gradient-to-r from-yellow-500 to-orange-500' style={{ height: '50px', width: "120px" }}>Login</button>
                </div>
            </div>
        </>
    )
}

export default LoginPage
