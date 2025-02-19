"use client";

import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useState } from "react";

function RingMenu({ position, onClose }: { position: [number, number, number]; onClose: () => void }) {
  // Positions for each menu item in a circle (adjust as needed)
  const menuItems = [
    { label: "Feed", top: "0%", left: "50%" },
    { label: "Pet", top: "60%", left: "15%" },
    // Add more options here
  ];

  return (
    <Html position={position} distanceFactor={12} transform>
      <div style={{ position: "relative", width: "150px", height: "150px" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "5px solid #ff33",
            position: "relative",
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                // Handle menu action here (e.g., call a feed/pet function)
                console.log(`${item.label} action selected`);
                onClose();
              }}
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: item.top,
                left: item.left,
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              padding: "2px 5px",
              fontSize: "0.7rem",
            }}
          >
            X
          </button>
        </div>
      </div>
    </Html>
  );
}

export default function Scene() {
  // Track state to show/hide the ring menu and its position in the world
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<[number, number, number]>([0, 0, 0]);

  function handleTurtleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    
    const { point } = e;
    setMenuPosition([point.x, point.y, point.z]);
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas style={{ height: "100vh" }} gl={{ preserveDrawingBuffer: true }} onPointerMissed={closeMenu}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh onClick={handleTurtleClick} position={[0, 0, 0]}>
          {/* Replace the boxGeometry with your turtle model when available */}
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
          {menuOpen && <RingMenu position={menuPosition} onClose={closeMenu} />}
        </mesh>
      </Canvas>
    </div>
  );
}
