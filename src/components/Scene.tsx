"use client";

import { Canvas, ThreeEvent } from "@react-three/fiber";
import useRingMenuStore from "../store/ringMenuStore";
import RingMenu from "./RingMenu";

export default function Scene() {
  const { openMenu, closeMenu } = useRingMenuStore();

  function handleTurtleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    const { point } = e;
    openMenu([point.x, point.y, point.z]);
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas
        style={{ height: "100vh" }}
        gl={{ preserveDrawingBuffer: true, alpha: true}}
        onPointerMissed={closeMenu}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh onClick={handleTurtleClick} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
          <RingMenu />
        </mesh>
      </Canvas>
    </div>
  );
}
