import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AbsoluteFill } from "remotion";

interface CountdownTimerProps {
  seconds: number;
  message: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  message,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculer le temps restant
  const framesPerSecond = fps;
  const totalFrames = seconds * framesPerSecond;
  const remainingFrames = totalFrames - frame;
  const remainingSeconds = Math.ceil(remainingFrames / framesPerSecond);

  // Animation pour chaque seconde
  const progress = 1 - remainingFrames / totalFrames;
  const progressArc = progress * 2 * Math.PI;

  // Animation pulsante
  const pulse = Math.sin(frame / 10) * 0.05 + 1;

  // Animation du message
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
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
            transform: `scale(${pulse})`,
            marginBottom: "40px",
          }}
        >
          {/* Cercle d'arrière-plan */}
          <svg width="300" height="300" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1E1E3F"
              strokeWidth="8"
            />

            {/* Cercle de progression */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#64DFDF"
              strokeWidth="8"
              strokeDasharray={`${progressArc * 45} ${2 * Math.PI * 45}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>

          {/* Chiffre du compte à rebours */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "8rem",
              fontWeight: "bold",
              color: "#FFFFFF",
              textShadow: "0 0 10px rgba(0, 124, 255, 0.7)",
            }}
          >
            {remainingSeconds}
          </div>
        </div>

        {/* Message */}
        <div
          style={{
            fontSize: "3rem",
            color: "#FFFFFF",
            opacity: messageOpacity,
            transform: `translateY(${messageY}px)`,
            textAlign: "center",
            padding: "0 20px",
            maxWidth: "800px",
          }}
        >
          {message}
        </div>
      </div>
    </AbsoluteFill>
  );
};
