import React, { useEffect, useRef } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import Prism from "prismjs";
import { type ThemeName, themes } from "../themes/editorThemes";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

const { fontFamily } = loadFont();

interface CodeEditorProps {
  initialCode: string;
  typingSpeed?: number;
  showLineNumbers?: boolean;
  highlightOutput?: boolean;
  theme?: ThemeName;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  typingSpeed = 1,
  showLineNumbers = false,
  highlightOutput = false,
  theme = "dark",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const codeRef = useRef<HTMLElement>(null);
  const currentTheme = themes[theme];

  // Animation d'écriture
  const typedChars = Math.min(frame * typingSpeed, initialCode.length);
  const currentCode = initialCode.slice(0, typedChars);

  // Animation pour les sorties console
  const outputAnimation = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [currentCode]);

  const renderLine = (line: string) => {
    if (highlightOutput && line.includes("Output:")) {
      const [prefix, output] = line.split("Output:");
      const opacity = interpolate(outputAnimation, [0, 1], [0, 1]);
      return `${prefix}Output:${opacity >= 0.1 ? output : ""}`;
    }
    return line;
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: currentTheme.background,
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: currentTheme.containerBackground,
          borderRadius: "8px",
          padding: "2rem",
          height: "100%",
          overflow: "auto",
          overflowX: "hidden",
          position: "relative",
          color: currentTheme.textColor,
        }}
      >
        {showLineNumbers && (
          <div
            style={{
              position: "absolute",
              left: "1rem",
              top: "2rem",
              bottom: "2rem",
              color: currentTheme.lineNumbersColor,
              borderRight: `1px solid ${currentTheme.lineNumbersBorder}`,
              paddingRight: "1rem",
              fontFamily,
              fontSize: "1.6em",
              userSelect: "none",
            }}
          >
            {currentCode.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre
          style={{
            margin: 0,
            fontFamily,
            fontSize: "1.6em",
            lineHeight: 1.6,
            paddingLeft: showLineNumbers ? "4rem" : 0,
          }}
        >
          <code
            ref={codeRef}
            className="language-javascript"
            style={{
              display: "block",
              whiteSpace: "pre",
              wordWrap: "normal",
            }}
          >
            {currentCode.split("\n").map(renderLine).join("\n")}
          </code>
        </pre>
      </div>
    </AbsoluteFill>
  );
};
