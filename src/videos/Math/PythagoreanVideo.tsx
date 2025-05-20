import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";

// Composant pour dessiner un triangle rectangle animé
const AnimatedTriangle: React.FC<{
  size: number;
  color: string;
  rotation?: number;
}> = ({ size, color, rotation = 0 }) => {
  const frame = useCurrentFrame();

  const draw = spring({
    frame,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const path = `
    M 0 0
    L ${size * draw} 0
    L ${size * draw} ${size * draw}
    Z
  `;

  return (
    <svg
      width={size}
      height={size}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      <path d={path} fill={color} opacity={0.8} />
    </svg>
  );
};

// Composant pour les carrés animés
const AnimatedSquare: React.FC<{
  size: number;
  color: string;
  delay?: number;
}> = ({ size, color, delay = 0 }) => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        opacity: 0.8,
      }}
    />
  );
};

// Composant pour le texte animé
const AnimatedText: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();

  const opacity = spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        opacity,
        fontSize: "2rem",
        color: "white",
        fontFamily: "system-ui",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

export const PythagoreanVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Dimensions du triangle
  const a = 100;
  const b = 150;
  const c = Math.sqrt(a * a + b * b);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TransitionSeries>
        {/* Introduction */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatedText text="The Pythagorean Theorem" delay={30} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Triangle Demonstration */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <div style={{ position: "relative" }}>
              <AnimatedTriangle size={200} color="#3B82F6" />
              <AnimatedText text="a² + b² = c²" delay={60} />
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Square Demonstration */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <AnimatedSquare size={a} color="#3B82F6" delay={0} />
            <AnimatedText text="+" delay={30} />
            <AnimatedSquare size={b} color="#2DD4BF" delay={30} />
            <AnimatedText text="=" delay={60} />
            <AnimatedSquare size={c} color="#EC4899" delay={90} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Final Formula */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <AnimatedText text={`${a}² + ${b}² = ${c.toFixed(0)}²`} delay={0} />
            <AnimatedText
              text={`${a * a} + ${b * b} = ${Math.round(c * c)}`}
              delay={30}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
