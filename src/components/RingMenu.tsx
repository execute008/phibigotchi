import useRingMenuStore from '@/store/ringMenuStore';
import { Html } from "@react-three/drei";
import { useEffect } from 'react';
export default function RingMenu() {
    const {position, setPosition, isOpen } = useRingMenuStore();

    useEffect(() => {
        if(!isOpen) {
            setTimeout(() => setPosition([-1000, -1000, 0]), 300);
        }
    }, [isOpen, setPosition]);

  const menuItems = [
    { label: "Feed", top: "0%", left: "50%" },
    { label: "Pet", top: "60%", left: "5%" },
  ];

  return (
    <>
      <Html position={position} distanceFactor={12} transform>
        <style>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes fadeOutScale {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.8);
            }
          }
          .ring-menu-container.animate {
            animation: fadeInScale 0.3s ease-out forwards;
          }
          .ring-menu-container.closing {
            animation: fadeOutScale 0.3s ease-out forwards;
          }
          .ring-menu-button {
            transition: transform 0.1s ease;
          }
          .ring-menu-button:active {
            transform: scale(0.95) translate(-50%, -50%);
          }
        `}</style>
        <div style={{ position: "relative", width: "100px", height: "100px"}}>
          <div
            className={`ring-menu-container ${isOpen ? "animate" : "closing"}`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => console.log(item.label)}
                className="ring-menu-button"
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  top: item.top,
                  left: item.left,
                  padding: "2px 5px",
                  borderRadius: "10px",
                  fontSize: "10px",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.7)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </Html>
    </>
  );
}
