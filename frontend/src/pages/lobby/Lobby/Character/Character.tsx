import React, { Suspense, useEffect, useRef } from 'react'
import { SkinnedMesh, Group } from 'three'
import { useArmature } from '../../CharacterMix/MainSkeleton'
import Cus from './Cus'
import type { CustomItems, ItemType } from "../../../../types"
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
    Billboard,
    PerspectiveCamera,
    PointerLockControls,
    Text3D,
    useAnimations,
    useFBX,
} from '@react-three/drei'

interface PropsCharacter extends React.ComponentProps<'group'> {
    customItems: CustomItems | undefined,
    name: string
}

const defaultCustom = JSON.parse(localStorage.getItem("customItems") as string) as CustomItems



const Character: React.FC<PropsCharacter> = (props) => {
    const group = useRef<Group>(null)
    const armatureRef = useRef<Group>(null)

    const { nodes } = useArmature()

    // Load animation
    const { animations } = useFBX('/animate/Idle.fbx')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        actions['mixamo.com']?.play()
    }, [actions])



    return (
        <group ref={group} {...props} >
            <group name="Scene">
                <group name="Armature" ref={armatureRef}>
                    {/* Gắn các bone gốc */}
                    {(nodes.Plane as SkinnedMesh).skeleton.bones
                        .filter((bone) => !bone.parent || !(bone.parent instanceof THREE.Bone))
                        .map((bone, index) => (
                            <primitive key={index} object={bone} />
                        ))}

                    {/* Text nổi tên người chơi */}
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
                            {props.name}
                            <meshStandardMaterial color="orange" />
                        </Text3D>
                    </Billboard>

                    <Suspense fallback={null}>
                        <skinnedMesh
                            name="Plane"
                            geometry={(nodes.Plane as SkinnedMesh).geometry}
                            material={(nodes.Plane as SkinnedMesh).material}
                            skeleton={(nodes.Plane as SkinnedMesh).skeleton}
                        />
                        <Cus customItems={props.customItems || defaultCustom} />
                    </Suspense>
                </group>
            </group>
        </group>
    )
}

export default Character
