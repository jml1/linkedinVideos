import React from "react";
import { random, AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { noise2D } from "@remotion/noise";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  delay: number;
}

const colors = [
  "#FF3366", // Rose vif
  "#33FF99", // Vert néon
  "#3366FF", // Bleu électrique
  "#FF9933", // Orange vif
  "#9933FF", // Violet néon
  "#FFFF33", // Jaune brillant
];

export const ColorExplosion: React.FC = () => {
  const frame = useCurrentFrame();

  const particles: Particle[] = React.useMemo(() => {
    return new Array(80).fill(0).map((_, i) => ({
      x: 50,
      y: 50,
      size: random(`size-${i}`) * 30 + 20, // Particules plus grandes
      color: colors[Math.floor(random(`color-${i}`) * colors.length)],
      speed: random(`speed-${i}`) * 1.5 + 0.5,
      angle: random(`angle-${i}`) * Math.PI * 2,
      delay: Math.floor(random(`delay-${i}`) * 15), // Délai réduit
    }));
  }, []);

  // Commencer avec des particules déjà visibles
  const initialScale = 0.8;

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        zIndex: 0,
        background:
          "radial-gradient(circle at center, #1a1a2e 0%, #0a0a15 100%)",
      }}
    >
      {particles.map((particle, i) => {
        const activeFrame = Math.max(0, frame - particle.delay);
        const progress = interpolate(activeFrame, [0, 100], [initialScale, 1], {
          extrapolateRight: "clamp",
          easing: (t) => t * (2 - t),
        });

        const distance = particle.speed * progress * 100;
        const x = particle.x + Math.cos(particle.angle) * distance;
        const y = particle.y + Math.sin(particle.angle) * distance;

        const opacity = interpolate(
          activeFrame,
          [0, 20, 80, 100],
          [0.8, 0.6, 0.4, 0], // Opacité initiale plus élevée
          {
            extrapolateRight: "clamp",
          },
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: "50%",
              opacity,
              transform: `scale(${progress})`,
              filter: "blur(8px)",
              boxShadow: `0 0 20px ${particle.color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
