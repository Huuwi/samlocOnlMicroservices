import { useGLTF } from "@react-three/drei"
import type { AssetProps } from "../../../types";
import { useEffect, useMemo } from "react";
import { SkinnedMesh } from "three";
import type { loadedType } from "../../../types";
import { useArmature } from "./MainSkeleton";

const Asset = (props: AssetProps) => {

    const { nodes } = useArmature()

    const modelLoaded = useGLTF(props.url)
    const attachedItems = useMemo((): loadedType[] => {
        const items: loadedType[] = [];

        modelLoaded.scene.traverse((child) => {
            if (child instanceof SkinnedMesh) {
                items.push({
                    geometry: child.geometry,
                    material: child.material,
                    morphTargetDictionary: child.morphTargetDictionary,
                    morphTargetInfluences: child.morphTargetInfluences
                });
            }
        });

        return items;
    }, [modelLoaded.scene]);
    return (
        attachedItems.map((item, index) => {
            return <skinnedMesh
                key={index}
                geometry={item.geometry}
                material={item.material}
                skeleton={(nodes.Plane as SkinnedMesh).skeleton}
                castShadow
                receiveShadow
                morphTargetDictionary={(item as SkinnedMesh).morphTargetDictionary}
                morphTargetInfluences={(item as SkinnedMesh).morphTargetInfluences}
            />
        })
    )
}

export default Asset
