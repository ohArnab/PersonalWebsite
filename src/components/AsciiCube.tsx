import React, { useEffect, useState } from "react";

const FRAME_DELAY_MS = 70;

// Generate once (not per frame)
const generateFrames = () => {
  const frames: string[] = [];

  const width = 32;
  const height = 16;
  const size = 6;
  const dist = 20;
  const scale = 14;

  const chars = ["@", ".", "$", "#", "+", ";"];

  for (let f = 0; f < 64; f++) {
    const A = (f / 64) * Math.PI * 2;
    const B = (f / 64) * Math.PI * 2;
    const C = (f / 64) * Math.PI;

    const zBuffer = new Float32Array(width * height);
    const buffer = new Array(width * height).fill(" ");

    const X = (i: number, j: number, k: number) =>
      j * Math.sin(A) * Math.sin(B) * Math.cos(C) -
      k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
      j * Math.cos(A) * Math.sin(C) +
      k * Math.sin(A) * Math.sin(C) +
      i * Math.cos(B) * Math.cos(C);

    const Y = (i: number, j: number, k: number) =>
      j * Math.cos(A) * Math.cos(C) +
      k * Math.sin(A) * Math.cos(C) -
      j * Math.sin(A) * Math.sin(B) * Math.sin(C) +
      k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
      i * Math.cos(B) * Math.sin(C);

    const Z = (i: number, j: number, k: number) =>
      k * Math.cos(A) * Math.cos(B) -
      j * Math.sin(A) * Math.cos(B) +
      i * Math.sin(B);

    const plot = (x: number, y: number, z: number, ch: string) => {
      const ooz = 1 / z;
      const xp = Math.floor(width / 2 + scale * ooz * x * 2);
      const yp = Math.floor(height / 2 + scale * ooz * y);
      const idx = xp + yp * width;

      if (idx >= 0 && idx < width * height) {
        if (ooz > zBuffer[idx]) {
          zBuffer[idx] = ooz;
          buffer[idx] = ch;
        }
      }
    };

    // FILLED cube faces
    for (let x = -size; x < size; x += 0.7) {
      for (let y = -size; y < size; y += 0.7) {
        plot(X(x, y, size), Y(x, y, size), Z(x, y, size) + dist, chars[0]);
        plot(X(x, y, -size), Y(x, y, -size), Z(x, y, -size) + dist, chars[1]);

        plot(X(size, x, y), Y(size, x, y), Z(size, x, y) + dist, chars[2]);
        plot(X(-size, x, y), Y(-size, x, y), Z(-size, x, y) + dist, chars[3]);

        plot(X(x, size, y), Y(x, size, y), Z(x, size, y) + dist, chars[4]);
        plot(X(x, -size, y), Y(x, -size, y), Z(x, -size, y) + dist, chars[5]);
      }
    }

    let output = "";
    for (let i = 0; i < width * height; i++) {
      output += i % width === 0 ? "\n" : buffer[i];
    }

    frames.push(output);
  }

  return frames;
};

const CUBE_FRAMES = generateFrames();

export default function AsciiCubeScreen() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % CUBE_FRAMES.length);
    }, FRAME_DELAY_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <pre
        style={{
          margin: 0,
          fontFamily: "'Courier New', monospace",
          fontSize: "7px",
          lineHeight: "7px",
          color: "#22c55e",
          textShadow: "0 0 6px rgba(34, 197, 94, 0.8)",
          userSelect: "none",
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      >
        {CUBE_FRAMES[frameIndex]}
      </pre>
    </div>
  );
}