import React, { useEffect, useRef } from "react";

export default function AsciiCubeLogo() {
  const preRef = useRef<HTMLPreElement>(null);
  const angles = useRef({ A: 0, B: 0, C: 0 });

  // Resolution tuned for a 150x150px area
  const width = 40; 
  const height = 20;
  const K1 = 20; // Scale factor for projection
  const incrementSpeed = 1.2; 
  const cubeWidth = 10;
  const distanceFromCam = 40;

  useEffect(() => {
    let animationFrameId: number;

    const renderFrame = () => {
      const zBuffer = new Float32Array(width * height);
      const buffer = new Array(width * height).fill(" ");
      const { A, B, C } = angles.current;

      const calculateX = (i: number, j: number, k: number) => {
        return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
               j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
      };

      const calculateY = (i: number, j: number, k: number) => {
        return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) -
               j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
               i * Math.cos(B) * Math.sin(C);
      };

      const calculateZ = (i: number, j: number, k: number) => {
        return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
      };

      const castSurface = (cubeX: number, cubeY: number, cubeZ: number, char: string) => {
        const x = calculateX(cubeX, cubeY, cubeZ);
        const y = calculateY(cubeX, cubeY, cubeZ);
        const z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;
        const ooz = 1 / z;
        
        // Project to 2D space - multiplier 2 accounts for font aspect ratio
        const xp = Math.floor(width / 2 + K1 * ooz * x * 2);
        const yp = Math.floor(height / 2 + K1 * ooz * y);

        const idx = xp + yp * width;
        if (idx >= 0 && idx < width * height) {
          if (ooz > zBuffer[idx]) {
            zBuffer[idx] = ooz;
            buffer[idx] = char;
          }
        }
      };

      for (let v = -cubeWidth; v < cubeWidth; v += incrementSpeed) {
        for (let h = -cubeWidth; h < cubeWidth; h += incrementSpeed) {
          castSurface(v, h, cubeWidth, "@");      
          castSurface(v, h, -cubeWidth, ".");     
          castSurface(cubeWidth, v, h, "$");      
          castSurface(-cubeWidth, v, h, "#");     
          castSurface(v, -cubeWidth, h, "+");     
          castSurface(v, cubeWidth, h, ";");      
        }
      }

      let output = "";
      for (let k = 0; k < width * height; k++) {
        output += k % width === 0 ? "\n" : buffer[k];
      }

      if (preRef.current) {
        preRef.current.innerText = output;
      }

      angles.current.A += 0.05;
      angles.current.B += 0.05;
      angles.current.C += 0.02;

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{ 
      width: "150px", 
      height: "150px", 
      background: "transparent", // Transparent background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      <pre
        ref={preRef}
        style={{
          margin: 0,
          fontFamily: "'Courier New', monospace",
          fontSize: "7px",     // Tiny font for tiny box
          lineHeight: "7px",   
          color: "#8bd5ff",
          textShadow: "0 0 5px rgba(139, 213, 255, 0.8)",
          userSelect: "none",
          backgroundColor: "transparent", // Ensure no background here either
          pointerEvents: "none"
        }}
      />
    </div>
  );
}