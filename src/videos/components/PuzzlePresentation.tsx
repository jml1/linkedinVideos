import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { AbsoluteFill } from "remotion";

interface PuzzlePresentationProps {
  question: string;
  codeExample: string;
}

export const PuzzlePresentation: React.FC<PuzzlePresentationProps> = ({
  question,
  codeExample,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const codeOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15 },
  });

  const codeY = interpolate(
    spring({
      frame: frame - 15,
      fps,
      config: { damping: 15 },
    }),
    [0, 1],
    [30, 0],
  );

  // Animation de surbrillance pour le code
  const lineCount = codeExample.split("\n").length;
  const highlightLine = Math.floor((frame / 30) % lineCount);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A2A",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: "3.5rem",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center",
          padding: "0 20px",
          color: "#FFFFFF",
          textShadow: "0 0 10px rgba(0, 124, 255, 0.5)",
        }}
      >
        {question}
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
            fontSize: "1.1rem",
            fontFamily: "Consolas, monospace",
            margin: 0,
            color: "#A9B7C6",
            overflowX: "hidden",
            whiteSpace: "pre-wrap",
          }}
        >
          {codeExample.split("\n").map((line, i) => (
            <div
              key={i}
              style={{
                backgroundColor:
                  i === highlightLine
                    ? "rgba(100, 223, 223, 0.1)"
                    : "transparent",
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
    </AbsoluteFill>
  );
};
