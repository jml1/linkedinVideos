import React from "react";
import { spring, useCurrentFrame } from "remotion";

interface AnimatedBarProps {
  label: string;
  beforeValue: number;
  afterValue: number;
  unit: string;
  delay?: number;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  label,
  beforeValue,
  afterValue,
  unit,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        margin: "1rem 0",
      }}
    >
      <div style={{ color: "white", fontSize: "1.8rem" }}>{label}</div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Before bar */}
        <div
          style={{
            height: "30px",
            width: `${100 * progress}%`,
            backgroundColor: "#FF4B4B",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {beforeValue}
            {unit}
          </span>
        </div>
        {/* After bar */}
        <div
          style={{
            height: "30px",
            width: `${(afterValue / beforeValue) * 100 * progress}%`,
            backgroundColor: "#2DD4BF",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {afterValue}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};
