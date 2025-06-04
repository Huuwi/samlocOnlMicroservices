import { Canvas } from "@react-three/fiber"
import MainCharacter from "../CharacterMix/MainCharacter"
import { OrbitControls } from "@react-three/drei"

const Lobby = () => {
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
                <MainCharacter />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2.2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.0001}
                />
                <directionalLight position={[-5, 5, 5]} intensity={0.7} />
                <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"} />
                <directionalLight position={[-3, 3, -5]} intensity={8} color={"#3cb1ff"} />
                <OrbitControls />
            </Canvas>
        </div>
    )
}


export default Lobby
