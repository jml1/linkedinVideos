import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";

interface CodeSnippetProps {
  code: string;
  language?: string;
  theme?: "dark" | "light";
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "typescript",
  theme = "dark",
}) => {
  const frame = useCurrentFrame();
  const opacity = spring({
    frame,
    from: 0,
    to: 1,
    fps: 30,
    config: { damping: 12 },
  });

  // Animation de scale pour chaque ligne
  const scale = spring({
    frame,
    from: 0.95,
    to: 1,
    fps: 30,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme === "dark" ? "#1a1b26" : "#ffffff",
        padding: "2rem",
        opacity,
      }}
    >
      <pre
        style={{
          margin: 0,
          marginTop: "5%",
          padding: "2rem",
          borderRadius: "1.5rem",
          backgroundColor: theme === "dark" ? "#1f2937" : "#f8fafc",
          boxShadow:
            theme === "dark"
              ? "0 0 30px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.05)"
              : "0 0 30px rgba(0,0,0,0.1), inset 0 0 30px rgba(0,0,0,0.05)",
          overflow: "auto",
          fontSize: "1.8rem",
          lineHeight: 1.8,
          transform: `scale(${scale})`,
          border:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        {/* Effet de brillance */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />
        <code
          style={{
            color: theme === "dark" ? "#e2e8f0" : "#1e293b",
            fontFamily: "JetBrains Mono, monospace",
            display: "block",
            position: "relative",
            zIndex: 1,
          }}
        >
          {code.split("\n").map((line, index) => (
            <div
              key={index}
              style={{
                opacity: spring({
                  frame: frame - index * 3,
                  from: 0,
                  to: 1,
                  fps: 30,
                  config: { damping: 20 },
                }),
                transform: `translateX(${spring({
                  frame: frame - index * 3,
                  from: -20,
                  to: 0,
                  fps: 30,
                  config: { damping: 20 },
                })}px)`,
                padding: "0.2rem 0",
              }}
            >
              {line}
            </div>
          ))}
        </code>
      </pre>
    </AbsoluteFill>
  );
};
