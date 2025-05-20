import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { AbsoluteFill, Img } from "remotion";

interface IntroProps {
  title: string;
  subtitle: string;
}

export const Intro: React.FC<IntroProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const titleY = interpolate(
    spring({
      frame: frame - 5,
      fps,
      config: { damping: 15 },
    }),
    [0, 1],
    [50, 0],
  );

  const subtitleOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  const subtitleY = interpolate(
    spring({
      frame: frame - 20,
      fps,
      config: { damping: 12 },
    }),
    [0, 1],
    [30, 0],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A2A",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "6rem",
            color: "#FFFFFF",
            margin: 0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: "0 0 10px rgba(0, 124, 255, 0.7)",
          }}
        >
          {title}
        </h1>
        <h2
          style={{
            fontSize: "3rem",
            color: "#64DFDF",
            marginTop: "20px",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </h2>
      </div>

      {/* Effet de particules numériques (cercles animés) */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 20 + 5;
        const initialX = Math.random() * 1080;
        const initialY = Math.random() * 1080;
        const speed = Math.random() * 1 + 0.5;

        const x = (initialX + frame * speed) % 1080;
        const y = (initialY + frame * speed) % 1080;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "rgba(100, 223, 223, 0.3)",
              left: x,
              top: y,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
