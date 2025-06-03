import { CameraControls } from "@react-three/drei"
import { useRef } from "react"



const CameraManager = () => {

    const controls = useRef(null)

    return (

        <CameraControls
            ref={controls}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
        />
    )
}

export default CameraManager


