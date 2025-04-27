import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";

interface ModernTitleProps {
  title: string;
  emoji: string;
  gradient?: [string, string];
}

export const ModernTitle: React.FC<ModernTitleProps> = ({
  title,
  emoji,
  gradient = ["#FF0080", "#7928CA"],
}) => {
  const frame = useCurrentFrame();
  const scale = spring({
    frame,
    from: 0,
    to: 1,
    fps: 30,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui",
        padding: "2rem",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "8rem" }}>{emoji}</div>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "900",
            textAlign: "center",
            color: "white",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  );
};
