import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

interface Command {
  text: string;
  x: number;
  y: number;
  speed: number;
}

const commands = [
  "npm install",
  "git commit -m 'feat: implement map'",
  "yarn build",
  "docker compose up",
  "kubectl get pods",
  "ssh root@server",
  "curl api/v1/data",
  "webpack --mode production",
  "eslint --fix src/",
  "jest --coverage",
  "prettier --write .",
  "tsc --watch",
];

export const TerminalBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Augmentons le nombre de commandes et ajustons leur vitesse
  const terminalCommands: Command[] = React.useMemo(() => {
    return new Array(25).fill(0).map((_, i) => ({
      text: commands[i % commands.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.2 + Math.random() * 0.3, // Vitesse augmentée
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
      {terminalCommands.map((cmd, i) => {
        const y = ((cmd.y + frame * cmd.speed) % 120) - 20;
        const opacity = Math.max(
          0.1, // Opacité minimale augmentée
          Math.min(0.15, (50 - Math.abs(y - 50)) / 50), // Opacité maximale augmentée
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${cmd.x}%`,
              top: `${y}%`,
              transform: "translateY(-50%)",
              color: "#2bbc8a", // Couleur plus visible
              opacity,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "1.2rem", // Taille augmentée
              whiteSpace: "nowrap",
              textShadow: "0 0 8px rgba(43, 188, 138, 0.4)", // Glow effect augmenté
              filter: "blur(0.5px)", // Blur réduit
            }}
          >
            $ {cmd.text}
          </div>
        );
      })}
      {/* Overlay gradient ajusté pour plus de transparence */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(10,10,21,0.75) 0%, rgba(10,10,21,0.85) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
