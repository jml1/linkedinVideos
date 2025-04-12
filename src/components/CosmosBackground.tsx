import React from "react";
import { random, AbsoluteFill, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

export const CosmosBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const stars: Star[] = React.useMemo(() => {
    return new Array(200).fill(0).map((_, i) => ({
      x: random("x" + i) * 100,
      y: random("y" + i) * 100,
      size: random("size" + i) * 2 + 1,
      brightness: random("brightness" + i),
    }));
  }, []);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a15",
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
      }}
    >
      {stars.map((star, i) => {
        const noiseX = noise2D("x" + i, frame / 100, 0) * 50;
        const noiseY = noise2D("y" + i, 0, frame / 100) * 50;
        const twinkle = Math.sin(frame * star.brightness * 0.1) * 0.5 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x + noiseX}%`,
              top: `${star.y + noiseY}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity: twinkle,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${
                twinkle * 0.5
              })`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
