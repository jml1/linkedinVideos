import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";

const AnimatedBar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
  delay?: number;
  unit?: string;
}> = ({ label, value, maxValue, color, delay = 0, unit = "%" }) => {
  const frame = useCurrentFrame();

  const width = spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: (value / maxValue) * 100,
    config: { damping: 12 },
  });

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
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        opacity,
        margin: "1rem 0",
      }}
    >
      <div style={{ width: "150px", fontSize: "1.8rem", color: "white" }}>
        {label}
      </div>
      <div
        style={{
          height: "40px",
          width: `${width}%`,
          backgroundColor: color,
          borderRadius: "20px",
          position: "relative",
          transition: "width 0.3s ease",
          maxWidth: "70%",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          {value}
          {unit}
        </div>
      </div>
    </div>
  );
};

export const FrameworkStatsVideo: React.FC = () => {
  const marketShare = [
    { label: "React", value: 42, color: "#61DAFB" },
    { label: "Vue", value: 27, color: "#42B883" },
    { label: "Angular", value: 22, color: "#DD0031" },
    { label: "Svelte", value: 9, color: "#FF3E00" },
  ];

  const satisfaction = [
    { label: "React", value: 89, color: "#61DAFB" },
    { label: "Svelte", value: 91, color: "#FF3E00" },
    { label: "Vue", value: 87, color: "#42B883" },
    { label: "Angular", value: 75, color: "#DD0031" },
  ];

  const performance = [
    { label: "Svelte", value: 98, color: "#FF3E00", unit: "ms" },
    { label: "Vue", value: 127, color: "#42B883", unit: "ms" },
    { label: "React", value: 143, color: "#61DAFB", unit: "ms" },
    { label: "Angular", value: 198, color: "#DD0031", unit: "ms" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
      }}
    >
      <TransitionSeries>
        {/* Intro */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Framework Wars 2024"
            emoji="📊"
            gradient={["#6366F1", "#2DD4BF"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Market Share */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "2.5rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Market Share 🌍
            </h2>
            {marketShare.map((stat, i) => (
              <AnimatedBar
                key={stat.label}
                label={stat.label}
                value={stat.value}
                maxValue={100}
                color={stat.color}
                delay={i * 10}
              />
            ))}
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Satisfaction */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "2.5rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Developer Satisfaction ❤️
            </h2>
            {satisfaction.map((stat, i) => (
              <AnimatedBar
                key={stat.label}
                label={stat.label}
                value={stat.value}
                maxValue={100}
                color={stat.color}
                delay={i * 10}
              />
            ))}
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Performance Benchmark */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "2.5rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Render Time ⚡️
            </h2>
            {performance.map((stat, i) => (
              <AnimatedBar
                key={stat.label}
                label={stat.label}
                value={stat.value}
                maxValue={200}
                color={stat.color}
                delay={i * 10}
                unit="ms"
              />
            ))}
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Conclusion */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="React: Market Leader, But Not in Everything!"
            emoji="🤔"
            gradient={["#3B82F6", "#EC4899"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
