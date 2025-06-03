import React, { useRef } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { Backdrop, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { SkinnedMesh, Group } from 'three'
import Asset from './Asset'
import { TextureLoader } from 'three'
import { useArmature } from './MainSkeleton'
import Customization from './Customization'
import CameraManager from './CameraManager'

const BackgroundSetter = ({ url }: { url: string }) => {
    const texture = useLoader(TextureLoader, url)
    const { scene } = useThree()

    React.useEffect(() => {
        scene.background = texture
    }, [scene, texture])

    return null
}


const MainCharacter: React.FC<React.ComponentProps<'group'>> = (props) => {

    const group = useRef<Group>(null)

    const { nodes } = useArmature()

    return (
        <div>
            <Canvas camera={{ position: [3, 3, 3], fov: 50 }} style={{ height: "100vh" }} shadows  >
                <Environment preset="sunset" environmentIntensity={0.3} />

                <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.31}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#333" roughness={0.85} />
                </mesh>
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2.2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.0001}
                />
                {/* Fill Light */}
                <directionalLight position={[-5, 5, 5]} intensity={0.7} />
                {/* Back Lights */}
                <directionalLight position={[3, 3, -5]} intensity={6} color={"#ff3b3b"} />
                <directionalLight
                    position={[-3, 3, -5]}
                    intensity={8}
                    color={"#3cb1ff"}
                />                <CameraManager />
                {/* <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} /> */}
                <BackgroundSetter url="/images/commonImgs/gacha.png" />
                <color attach={"background"} args={["#555"]} />
                <fog attach={"fog"} args={["#555", 15, 25]} />
                {/* <Backdrop scale={[50, 10, 5]} floor={1.5} receiveShadow position-z={-4}>
                    <meshStandardMaterial color={"#555"} />
                </Backdrop> */}


                <axesHelper args={[5]} />

                <group ref={group} {...props} dispose={null}>
                    <group name="Scene">
                        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                            <skinnedMesh
                                name="Plane"
                                geometry={(nodes.Plane as SkinnedMesh).geometry}
                                material={(nodes.Plane as SkinnedMesh).material}
                                skeleton={(nodes.Plane as SkinnedMesh).skeleton}
                            />

                            <Asset url={"/Assets/NakedFullBody.glb"} />
                            <Customization />
                        </group>
                    </group>
                </group>
            </Canvas>
        </div>
    )
}

export default MainCharacter
