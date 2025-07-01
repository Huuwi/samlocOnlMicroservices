import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";
import MainCharacter from "../../CharacterMix/MainCharacter";
import type SocketClient from "../../../../socketIo/SocketClient";

type Vec2 = [number, number]; // x, y
type BoundingRec = [number, number, number, number]; // [minX, maxX, minY, maxY]


function checkInsideBoundingRec(point: Vec2, boundingRec: BoundingRec): boolean {
    let [x, y] = point;
    let [minX, maxX, minY, maxY] = boundingRec;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        return true;
    }
    return false
}

type PropsChaController = {
    lobbySocket: SocketClient
}


const CharacterController = (props: PropsChaController) => {
    const mainCharRef = useRef<Group>(null);
    const { camera } = useThree();

    const keysPressed = useRef<{ [key: string]: boolean }>({})


    const isMouseDown = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const cameraTarget = useRef<THREE.Vector3>(new THREE.Vector3());
    const cameraOffset = useRef(new THREE.Vector3(0, 15, -20));

    const accumulatedYaw = useRef(0); // Góc quay quanh trục Y (radian)
    const accumulatedPitch = useRef(0); // Góc pitch quanh trục X (lên/xuống)

    const min = new THREE.Vector3(-182.875, -0.7867861915018802, -63.65117333491793)
    const max = new THREE.Vector3(177.6934131730098, 122.82035142976031, 303.6165253987978)

    // Xoay camera bằng chuột
    useEffect(() => {

        if (mainCharRef.current) {
            mainCharRef.current.position.set(0, 0, 0);
        }

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

            // Update góc quay ngang và dọc
            accumulatedYaw.current += -deltaX * 0.002;
            accumulatedPitch.current += -deltaY * 0.002;

            // Giới hạn góc nhìn lên/xuống (pitch)
            const maxPitch = Math.PI / 2 - 0.5;  // ~85 độ
            const minPitch = -Math.PI / 2 + 2; // ~-85 độ
            accumulatedPitch.current = Math.max(minPitch, Math.min(maxPitch, accumulatedPitch.current));

            // (Tùy chọn) Giới hạn yaw trong khoảng [-π, π]
            accumulatedYaw.current = ((accumulatedYaw.current + Math.PI) % (2 * Math.PI)) - Math.PI;

            // Tạo quaternion xoay camera dựa trên pitch + yaw
            const euler = new THREE.Euler(
                accumulatedPitch.current,
                accumulatedYaw.current,
                0,
                "YXZ"
            );
            const quat = new THREE.Quaternion().setFromEuler(euler);

            // Áp dụng xoay vào camera offset
            cameraOffset.current.set(0, 0, -20).applyQuaternion(quat);

            lastMousePos.current = { x: e.clientX, y: e.clientY };
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
            camera.position.lerp(desiredCameraPos, 0.05);
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
            const yawQuat = new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                accumulatedYaw.current
            );
            direction.applyQuaternion(yawQuat);
            direction.normalize().multiplyScalar(moveSpeed);
            mainCharRef.current.position.add(direction);

            // Clamp từng trục:
            const pos = mainCharRef.current.position;
            pos.x = THREE.MathUtils.clamp(pos.x, min.x + 2, max.x - 2);
            pos.y = THREE.MathUtils.clamp(pos.y, min.y, max.y);
            pos.z = THREE.MathUtils.clamp(pos.z, min.z + 2, max.z - 2);

            // console.log('Player position:', pos);

            //check zone trigger
            if (checkInsideBoundingRec([pos.x, pos.z], [-10, 40, 230, 250])) {
                console.log("hello");

            }

        }
    });


    return (
        <>
            <MainCharacter ref={mainCharRef} scale={[0.02, 0.02, 0.02]} />
        </>
    );
};

export default CharacterController;
