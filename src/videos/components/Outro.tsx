import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { AbsoluteFill } from "remotion";

interface OutroProps {
  message: string;
  profileLink: string;
}

export const Outro: React.FC<OutroProps> = ({ message, profileLink }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const messageOpacity = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const messageY = interpolate(
    spring({
      frame,
      fps,
      config: { damping: 15 },
    }),
    [0, 1],
    [30, 0],
  );

  const profileOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15 },
  });

  const profileScale = spring({
    frame: frame - 15,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 15 },
  });

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
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Message principal */}
        <div
          style={{
            fontSize: "4rem",
            color: "#FFFFFF",
            opacity: messageOpacity,
            transform: `translateY(${messageY}px)`,
            textAlign: "center",
            padding: "0 40px",
            maxWidth: "900px",
            fontWeight: "bold",
            marginBottom: "60px",
          }}
        >
          {message}
        </div>

        {/* Profil LinkedIn */}
        <div
          style={{
            opacity: profileOpacity,
            transform: `scale(${profileScale})`,
            backgroundColor: "#0077B5", // Couleur LinkedIn
            padding: "20px 40px",
            borderRadius: "50px",
            fontSize: "2.5rem",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 5px 20px rgba(0, 119, 181, 0.5)",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* Logo LinkedIn (simplification SVG) */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
          </svg>
          {profileLink}
        </div>

        {/* Effet de particules animées */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const angle = (i / 30) * Math.PI * 2;
          const radius = 300;
          const speed = (Math.random() * 0.5 + 0.5) * 2;

          const x = Math.cos(angle + frame / (60 / speed)) * radius;
          const y = Math.sin(angle + frame / (60 / speed)) * radius;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 119, 181, 0.3)",
                left: "50%",
                top: "50%",
                transform: `translate(${x}px, ${y}px)`,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
