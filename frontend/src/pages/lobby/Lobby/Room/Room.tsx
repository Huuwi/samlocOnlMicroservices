import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, TrimeshCollider } from "@react-three/rapier";

type RoomProps = { url: string };

const Room: React.FC<RoomProps> = ({ url }) => {
    const { scene } = useGLTF(url) as { scene: THREE.Group };

    const colliders = useMemo(() => {
        const list: THREE.Mesh[] = [];
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.name.startsWith("collider_")) {
                list.push(child);
                child.visible = false;
            }
        });
        return list;
    }, [scene]);

    return (
        <>
            <primitive object={scene} />
            {colliders.map((mesh, i) => {
                const geom = mesh.geometry as THREE.BufferGeometry;
                const posAttr = geom.attributes.position;
                const idxAttr = geom.index;
                if (!posAttr || !idxAttr) return null;
                const positions = posAttr.array as unknown as number[];
                const indices = idxAttr.array as unknown as number[];
                return (
                    <RigidBody key={i} type="fixed">
                        <TrimeshCollider args={[positions, indices]} />
                    </RigidBody>
                );
            })}
        </>
    );
};

export default Room;