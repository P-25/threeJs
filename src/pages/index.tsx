import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/Loader";

import Prince from "@/models/prince";
import Lobby from "@/models/lobby";

export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  // const [showPopup, setShowPopup] = useState(false);

  // const handleConfirm = () => {
  //   setShowPopup(false);
  //   console.log("Confirmed!", showPopup);
  // };

  const adjustIs1andForScreenSize = () => {
    let screenSca1e = null;
    const screenPosition = [40, -30, -50];
    const rotation = [0, 5, 0];
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        screenSca1e = [10, 10, 10];
      } else {
        screenSca1e = [20, 20, 20];
      }
    }
    return [screenSca1e, screenPosition, rotation];
  };

  const [islandSca1e, islandPosition, islandRotation] =
    adjustIs1andForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            groundColor={`#000000`}
            color={`#b1e1ff`}
            intensity={1}
          />
          <Lobby />
          <Prince
            position={islandPosition}
            scale={islandSca1e}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </section>
  );
}
