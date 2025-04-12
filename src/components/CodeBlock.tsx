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
  const charsPerFrame = 0.8; // Vitesse de frappe réduite
  const totalChars = code.length;
  const typedChars = Math.min(frame * charsPerFrame, totalChars);

  let currentChar = 0;
  const animatedCode = codeLines
    .map((line) => {
      if (currentChar > typedChars) return "";
      const lineLength = line.length + 1;
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
        height: "1920px", // Hauteur totale de la vidéo
        padding: 0, // Supprime le padding pour utiliser tout l'espace
      }}
    >
      <div
        style={{
          opacity: containerAnimation,
          transform: `scale(${containerAnimation})`,
          backgroundColor: "#2a2a2a",
          borderRadius: "15px",
          padding: "1.5rem",
          width: "95%", // Augmente encore la largeur
          height: "90%", // Utilise 90% de la hauteur
          maxWidth: "1500px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
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
              fontSize: "2.5em",
              color: "#61dafb",
              margin: "0 0 1.5rem 0",
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
            padding: "2.5rem",
            overflow: "hidden",
            flex: 1, // Prend tout l'espace restant
            display: "flex",
            flexDirection: "column",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily,
              fontSize: "2.2em", // Augmente encore la taille de la police
              lineHeight: "1.7",
              flex: 1, // Prend tout l'espace disponible
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Centre verticalement le code
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
