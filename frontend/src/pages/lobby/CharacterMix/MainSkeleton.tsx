import { useGLTF } from '@react-three/drei'

export function useArmature() {
    return useGLTF('/Assets/Armature.glb')
}
