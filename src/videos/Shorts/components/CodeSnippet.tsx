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
          marginTop: "50%",
          padding: "1.5rem",
          borderRadius: "1rem",
          backgroundColor: theme === "dark" ? "#24283b" : "#f1f5f9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "auto",
          fontSize: "1.8rem",
          lineHeight: 1.5,
        }}
      >
        <code
          style={{
            color: theme === "dark" ? "#c0caf5" : "#1e293b",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {code}
        </code>
      </pre>
    </AbsoluteFill>
  );
};
