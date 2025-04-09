import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface TitleProps {
  title: string;
  subtitle: string;
}

export const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAnimation = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const subtitleAnimation = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: titleAnimation,
          transform: `scale(${titleAnimation})`,
        }}
      >
        <h1
          style={{
            fontSize: "5em",
            fontWeight: "bold",
            margin: 0,
            color: "#61dafb",
            textAlign: "center",
            textShadow: "0 0 20px rgba(97, 218, 251, 0.5)",
            fontFamily: "SF Pro Display, system-ui, sans-serif",
          }}
        >
          {title}
        </h1>
      </div>
      <div
        style={{
          opacity: subtitleAnimation,
          transform: `translateY(${interpolate(
            subtitleAnimation,
            [0, 1],
            [20, 0],
          )}px)`,
        }}
      >
        <h2
          style={{
            fontSize: "2.5em",
            fontWeight: "normal",
            margin: "20px 0 0 0",
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "SF Pro Display, system-ui, sans-serif",
          }}
        >
          {subtitle}
        </h2>
      </div>
    </AbsoluteFill>
  );
};
