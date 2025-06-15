import { Canvas, useFrame } from "@react-three/fiber"
import MainCharacter from "../CharacterMix/MainCharacter"
import { Environment, OrbitControls } from "@react-three/drei"
import sockets from "../../../socketIo/sockets"
import { Suspense, useEffect, useRef } from "react"
import Room from "./Room/Room"
import { Physics, RigidBody } from "@react-three/rapier";

import CharacterController from "./Character/CharacterController"
// import { PointerLockControls } from '@react-three/drei';


const Lobby = () => {

    // useEffect(() => {

    //     const lobbySocket = sockets.socketLobby.connect()



    //     return () => {

    //     }

    // }, [])




    return (
        <div className="relative w-screen h-screen">
            {/* Button layer */}
            <div className="absolute top-0 left-0 z-10" style={{ height: "100vh", width: "100vw", pointerEvents: "none" }}>
                <button
                    className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto"
                    style={{
                        height: "70px",
                        width: "150px",
                        margin: "20px",
                        pointerEvents: "auto", // cho phép click
                    }}
                    onClick={() => {
                        console.log("clicked");
                    }}
                >
                    Go to lobby
                </button>
            </div>

            {/* Canvas */}
            <Canvas camera={{ position: [3, 3, 5], fov: 50 }} className="bg-blue-300 z-0" style={{ height: "100vh", width: "100vw" }}>
                {/* <MainCharacter /> */}

                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2.2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.0001}
                />
                <directionalLight position={[-5, 5, 5]} intensity={0.7} />
                <directionalLight position={[3, 3, -5]} intensity={2} color={"#ff3b3b"} />
                <directionalLight position={[-3, 3, -5]} intensity={2} color={"#3cb1ff"} />


                <Suspense fallback={null}>
                    <Physics >

                        {/* Đặt đường dẫn đúng tới file .glb */}
                        <Room url="./room/room.glb" />
                        <Environment preset="apartment" background />
                        <CharacterController />

                    </Physics>

                </Suspense>


            </Canvas>
        </div>
    )
}


export default Lobby
