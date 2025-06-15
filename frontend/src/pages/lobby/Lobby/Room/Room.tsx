import React, { Suspense, type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

type ROOM = JSX.IntrinsicElements["group"] & {
    url: string;
};

const Room: React.FC<ROOM> = ({ url, ...props }) => {
    const { scene } = useGLTF(url);

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <primitive object={scene} {...props} />
        </RigidBody>
    );
};

export default Room;