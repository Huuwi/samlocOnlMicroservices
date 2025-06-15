import React, {
    forwardRef,
    useRef,
    useEffect,
    Suspense,
    useImperativeHandle,
} from 'react'
import { SkinnedMesh, Group } from 'three'
import { useArmature } from './MainSkeleton'
import Customization from './Customization'
import { GLTFExporter } from 'three-stdlib'
import { myStore } from '../../../store'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
    Billboard,
    Text3D,
    useAnimations,
    useFBX,
} from '@react-three/drei'

//  Bọc component bằng forwardRef
const MainCharacter = forwardRef<Group, React.ComponentProps<'group'>>((props, ref) => {
    const group = useRef<Group>(null)
    const armatureRef = useRef<Group>(null)

    const { nodes } = useArmature()
    const download = myStore((state) => state.download)

    //  Cho phép ref từ bên ngoài truy cập group nội bộ
    useImperativeHandle(ref, () => group.current as Group, [])

    // Load animation
    const { animations } = useFBX('/animate/Idle.fbx')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        actions['mixamo.com']?.play()
    }, [actions])

    // Export GLTF
    function handleDownload() {
        if (!group.current) {
            console.log('Group chưa sẵn sàng.')
            return
        }

        const link = document.createElement('a')
        link.style.display = 'none'
        document.body.appendChild(link)

        function save(blob: Blob, filename: string) {
            link.href = URL.createObjectURL(blob)
            link.download = filename
            link.click()
            document.body.removeChild(link)
        }

        const exporter = new GLTFExporter()
        exporter.parse(
            group.current as Group,
            (gltf) => {
                save(new Blob([gltf as ArrayBuffer], { type: 'application/octet-stream' }), `avatar.glb`)
            },
            (error) => {
                console.error('Lỗi khi xuất file:', error)
            },
            { binary: true }
        )
    }

    useEffect(() => {
        if (download > 0) {
            handleDownload()
        }
    }, [download])




    return (
        <group ref={group} {...props}>
            <group name="Scene">
                <group name="Armature" ref={armatureRef}>
                    {/* Gắn các bone gốc */}
                    {(nodes.Plane as SkinnedMesh).skeleton.bones
                        .filter((bone) => !bone.parent || !(bone.parent instanceof THREE.Bone))
                        .map((bone, index) => (
                            <primitive key={index} object={bone} />
                        ))}

                    {/* Tên nhân vật */}
                    <Billboard>
                        <Text3D
                            font="/fonts/typeface.json"
                            size={50}
                            height={0.5}
                            curveSegments={12}
                            bevelEnabled
                            bevelThickness={0.03}
                            bevelSize={0.02}
                            bevelSegments={5}
                            position={[-70, 250, 0]}
                        >
                            YOU
                            <meshStandardMaterial color="orange" />
                        </Text3D>
                    </Billboard>

                    {/* Mesh & đồ */}
                    <Suspense fallback={null}>
                        <skinnedMesh
                            name="Plane"
                            geometry={(nodes.Plane as SkinnedMesh).geometry}
                            material={(nodes.Plane as SkinnedMesh).material}
                            skeleton={(nodes.Plane as SkinnedMesh).skeleton}
                        />
                        <Customization />
                    </Suspense>
                </group>
            </group>
        </group>
    )
})

export default MainCharacter
