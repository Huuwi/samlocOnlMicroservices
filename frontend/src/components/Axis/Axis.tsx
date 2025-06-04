import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'

const AxisHelperWithLabels = () => {
    // Tạo 1 nhóm chứa các trục và label
    return (
        <group>
            {/* Hiển thị hệ trục */}
            <primitive object={new THREE.AxesHelper(5)} />

            {/* Nhãn trục X */}
            <Billboard>
                <Text
                    position={[5.3, 0, 0]}
                    fontSize={0.5}
                    color="red"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Roboto-Regular.ttf"
                >
                    X
                </Text>
            </Billboard>
            {/* Đơn vị trên trục X */}
            {[1, 2, 3, 4, 5].map((v) => (
                <Billboard key={`x-${v}`}>
                    <Text
                        position={[v, 0, 0]}
                        fontSize={0.25}
                        color="red"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/Roboto-Regular.ttf"
                    >
                        {v}
                    </Text>
                </Billboard>
            ))}

            {/* Nhãn trục Y */}
            <Billboard>
                <Text
                    position={[0, 5.3, 0]}
                    fontSize={0.5}
                    color="green"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Roboto-Regular.ttf"
                >
                    Y
                </Text>
            </Billboard>
            {/* Đơn vị trên trục Y */}
            {[1, 2, 3, 4, 5].map((v) => (
                <Billboard key={`y-${v}`}>
                    <Text
                        position={[0, v, 0]}
                        fontSize={0.25}
                        color="green"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/Roboto-Regular.ttf"
                    >
                        {v}
                    </Text>
                </Billboard>
            ))}

            {/* Nhãn trục Z */}
            <Billboard>
                <Text
                    position={[0, 0, 5.3]}
                    fontSize={0.5}
                    color="blue"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Roboto-Regular.ttf"
                >
                    Z
                </Text>
            </Billboard>
            {/* Đơn vị trên trục Z */}
            {[1, 2, 3, 4, 5].map((v) => (
                <Billboard key={`z-${v}`}>
                    <Text
                        position={[0, 0, v]}
                        fontSize={0.25}
                        color="blue"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/Roboto-Regular.ttf"
                    >
                        {v}
                    </Text>
                </Billboard>
            ))}
        </group>
    )
}

export default AxisHelperWithLabels

