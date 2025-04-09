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
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

const { fontFamily } = loadFont();

interface CodeBlockProps {
  code: string;
  language: string;
  title: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const codeRef = useRef<HTMLElement>(null);

  const containerAnimation = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const titleAnimation = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Animation de frappe du code (ralentie)
  const codeLines = code.split("\n");
  const charsPerFrame = 0.8; // Vitesse de frappe réduite (était à 2)
  const totalChars = code.length;
  const typedChars = Math.min(frame * charsPerFrame, totalChars);

  let currentChar = 0;
  const animatedCode = codeLines
    .map((line) => {
      if (currentChar > typedChars) return "";
      const lineLength = line.length + 1; // +1 pour le \n
      const visibleChars = Math.max(
        0,
        Math.min(lineLength, typedChars - currentChar),
      );
      currentChar += lineLength;
      return line.slice(0, visibleChars);
    })
    .join("\n");

  // Animation de mise en évidence des commentaires
  const commentHighlight = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 50,
      stiffness: 100,
      mass: 0.8,
    },
  });

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [animatedCode]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem", // Réduit le padding général
      }}
    >
      <div
        style={{
          opacity: containerAnimation,
          transform: `scale(${containerAnimation})`,
          backgroundColor: "#2a2a2a",
          borderRadius: "15px",
          padding: "1.5rem", // Réduit le padding du container
          width: "90%", // Augmente la largeur
          maxWidth: "1200px", // Augmente la largeur maximale
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            opacity: titleAnimation,
            transform: `translateY(${interpolate(
              titleAnimation,
              [0, 1],
              [20, 0],
            )}px)`,
          }}
        >
          <h3
            style={{
              fontSize: "2.2em",
              color: "#61dafb",
              margin: "0 0 1rem 0",
              fontFamily: "SF Pro Display, system-ui, sans-serif",
              textShadow: "0 0 10px rgba(97, 218, 251, 0.3)",
            }}
          >
            {title}
          </h3>
        </div>
        <div
          style={{
            position: "relative",
            backgroundColor: "#1a1a1a",
            borderRadius: "10px",
            padding: "2rem",
            overflow: "hidden",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily,
              fontSize: "1.8em", // Augmente la taille de la police
              lineHeight: "1.6",
            }}
          >
            <code
              ref={codeRef}
              className={`language-${language}`}
              style={{
                display: "block",
                whiteSpace: "pre",
                overflowX: "visible",
                overflowY: "visible",
              }}
            >
              {animatedCode}
            </code>
          </pre>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(97, 218, 251, 0.1))",
              opacity: commentHighlight,
              transform: `translateX(${interpolate(
                commentHighlight,
                [0, 1],
                [-100, 0],
              )}%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
