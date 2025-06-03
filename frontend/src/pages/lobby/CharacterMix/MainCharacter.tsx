import React, { Suspense, useEffect, useRef } from 'react';
import { SkinnedMesh, Group } from 'three';
import { useArmature } from './MainSkeleton';
import Customization from './Customization';
import { GLTFExporter } from 'three-stdlib';
import { myStore } from '../../../store';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useFBX } from '@react-three/drei';

const MainCharacter: React.FC<React.ComponentProps<'group'>> = (props) => {
    const group = useRef<Group>(null);
    const armatureRef = useRef<Group>(null);

    const { nodes } = useArmature();
    const download = myStore((state) => state.download);

    const { animations } = useFBX("/animate/Idle.fbx")
    const { actions } = useAnimations(animations, group);
    useEffect(() => {
        actions['mixamo.com']?.play()
    }, [actions])

    // Xử lý xuất file GLTF
    function handleDownload() {


        if (!group.current) {
            console.log('Group chưa sẵn sàng.');
            return;
        }

        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);

        function save(blob: Blob, filename: string) {
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            document.body.removeChild(link);
        }

        const exporter = new GLTFExporter();
        exporter.parse(
            group.current as Group,
            (gltf) => {
                save(
                    new Blob([gltf as ArrayBuffer], { type: 'application/octet-stream' }),
                    `avatar.glb`
                );
            },
            (error) => {
                console.error('Lỗi khi xuất file:', error);
            },
            { binary: true }
        );
    }

    useEffect(() => {
        if (download > 0) {
            handleDownload();
        }
    }, [download]);

    return (
        <group ref={group} {...props} scale={0.01} >
            <group name="Scene">
                <group name="Armature" ref={armatureRef}>
                    {/* Thêm các xương gốc vào cảnh */}
                    {(nodes.Plane as SkinnedMesh).skeleton.bones
                        .filter(bone => !bone.parent || !(bone.parent instanceof THREE.Bone))
                        .map((bone, index) => (
                            <primitive key={index} object={bone} />
                        ))}
                    <Suspense>
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

    );
};

export default MainCharacter;