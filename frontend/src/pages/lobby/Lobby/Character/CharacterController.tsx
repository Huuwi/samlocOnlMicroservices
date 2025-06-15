import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";
import MainCharacter from "../../CharacterMix/MainCharacter";
import { RigidBody } from "@react-three/rapier";

const CharacterController = () => {
    const mainCharRef = useRef<Group>(null);
    const { camera } = useThree();

    const keysPressed = useRef<{ [key: string]: boolean }>({})


    const isMouseDown = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const cameraTarget = useRef<THREE.Vector3>(new THREE.Vector3());
    const cameraOffset = useRef(new THREE.Vector3(0, 15, -20));

    const accumulatedYaw = useRef(0); // Góc quay quanh trục Y (radian)

    // Xoay camera bằng chuột
    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            isMouseDown.current = true;
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            isMouseDown.current = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMouseDown.current) return;

            const deltaX = e.clientX - lastMousePos.current.x;
            const deltaY = e.clientY - lastMousePos.current.y;

            // Tích lũy góc yaw (quay quanh trục Y)
            accumulatedYaw.current += -deltaX * 0.002;

            // Giới hạn góc trong khoảng -π đến π (tuỳ chọn)
            accumulatedYaw.current = ((accumulatedYaw.current + Math.PI) % (Math.PI * 2)) - Math.PI;

            // Tạo quaternion xoay camera
            const euler = new THREE.Euler(
                deltaY * 0.002,
                -deltaX * 0.002,
                0,
                "YXZ"
            );
            const quat = new THREE.Quaternion().setFromEuler(euler);
            cameraOffset.current.applyQuaternion(quat);

            lastMousePos.current = { x: e.clientX, y: e.clientY };

            console.log("Yaw (radian):", accumulatedYaw.current);

        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);


    // Điều khiển bằng WASD
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current[e.key.toLowerCase()] = true
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current[e.key.toLowerCase()] = false
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useFrame((_, delta) => {
        if (mainCharRef.current) {

            //rotate character
            const charPos = mainCharRef.current.position;
            cameraTarget.current.copy(charPos);

            const desiredCameraPos = charPos.clone().add(cameraOffset.current);
            camera.position.lerp(desiredCameraPos, 0.1);

            camera.lookAt(cameraTarget.current);

            // Gán góc xoay Y cho nhân vật (nếu muốn nhân vật xoay theo camera)
            mainCharRef.current.rotation.y = accumulatedYaw.current;



            //movement
            const moveSpeed = 30 * delta
            const direction = new THREE.Vector3()

            if (keysPressed.current['w']) direction.z += 1
            if (keysPressed.current['s']) direction.z -= 1
            if (keysPressed.current['a']) direction.x += 1
            if (keysPressed.current['d']) direction.x -= 1

            direction.normalize().multiplyScalar(moveSpeed)
            mainCharRef.current.position.add(direction)
        }
    });





    return (
        <>
            <MainCharacter ref={mainCharRef} scale={[0.02, 0.02, 0.02]} />

        </>
    );
};

export default CharacterController;
