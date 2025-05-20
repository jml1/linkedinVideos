import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { AbsoluteFill } from "remotion";

interface SolutionProps {
  title: string;
  explanation: string;
  improvedCode: string;
}

export const Solution: React.FC<SolutionProps> = ({
  title,
  explanation,
  improvedCode,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const explanationOpacity = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15 },
  });

  const codeOpacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15 },
  });

  const codeY = interpolate(
    spring({
      frame: frame - 20,
      fps,
      config: { damping: 15 },
    }),
    [0, 1],
    [30, 0],
  );

  // Animation de surbrillance pour le code amélioré
  const lineCount = improvedCode.split("\n").length;
  const highlightLine = Math.floor((frame % (lineCount * 30)) / 30);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A2A",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "white",
        overflow: "hidden",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          color: "#64DFDF",
          textShadow: "0 0 10px rgba(100, 223, 223, 0.5)",
        }}
      >
        {title}
      </div>

      <div
        style={{
          opacity: explanationOpacity,
          fontSize: "2.5rem",
          marginBottom: "40px",
          textAlign: "center",
          padding: "0 50px",
          color: "#FFFFFF",
          maxWidth: "900px",
        }}
      >
        {explanation}
      </div>

      <div
        style={{
          opacity: codeOpacity,
          transform: `translateY(${codeY}px)`,
          backgroundColor: "#1E1E3F",
          padding: "30px",
          borderRadius: "10px",
          width: "80%",
          maxWidth: "800px",
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <pre
          style={{
            fontSize: "1.8rem",
            fontFamily: "Consolas, monospace",
            margin: 0,
            color: "#A9B7C6",
            overflowX: "hidden",
            whiteSpace: "pre-wrap",
          }}
        >
          {improvedCode.split("\n").map((line, i) => (
            <div
              key={i}
              style={{
                backgroundColor:
                  i === highlightLine ? "rgba(0, 255, 0, 0.1)" : "transparent",
                padding: "5px 10px",
                borderRadius: "3px",
                transition: "background-color 0.3s ease",
              }}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>

      {/* Effet visuel de succès */}
      {frame > 60 &&
        Array.from({ length: 20 }).map((_, i) => {
          const delay = i * 5;
          const visible = frame > 60 + delay;
          const particleFrame = frame - 60 - delay;

          if (!visible) return null;

          const x = Math.sin(i) * 500 * (particleFrame / 60);
          const y =
            Math.cos(i) * 500 * (particleFrame / 60) -
            (particleFrame * particleFrame) / 50;
          const opacity = Math.max(0, 1 - particleFrame / 120);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                backgroundColor: "#64DFDF",
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: `translate(${x}px, ${y}px)`,
                opacity,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
