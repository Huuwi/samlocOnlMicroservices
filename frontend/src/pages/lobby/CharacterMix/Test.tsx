// components/GLBModel.tsx
import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

interface GLBModelProps {
    url: string
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

const GLBModel: React.FC<GLBModelProps> = ({
    url,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0]
}) => {
    const gltf = useGLTF(url)

    return (
        <Suspense fallback={null}>
            <primitive
                object={gltf.scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </Suspense>
    )
}

export default GLBModel
