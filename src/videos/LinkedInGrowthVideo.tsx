import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { CosmosBackground } from "../components/CosmosBackground";
import { ModernTitle } from "./Shorts/components/ModernTitle";

// Composant pour les faits marquants
const HighlightFact: React.FC<{
  title: string;
  description: string;
  emoji: string;
  delay?: number;
}> = ({ title, description, emoji, delay = 0 }) => {
  const frame = useCurrentFrame();

  const slideUp = spring({
    frame: frame - delay,
    fps: 30,
    from: 100,
    to: 0,
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
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${slideUp}px)`,
        opacity,
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "5rem", marginBottom: "2rem" }}>{emoji}</div>
      <div
        style={{
          fontSize: "2.4rem",
          fontWeight: "bold",
          color: "white",
          marginBottom: "1rem",
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "1.8rem",
          color: "#94A3B8",
          maxWidth: "90%",
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  );
};

export const LinkedInGrowthVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a192f" }}>
      <CosmosBackground />
      <TransitionSeries>
        {/* Intro */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Le Paradoxe du Birthday Problem"
            emoji="🎂"
            gradient={["#3B82F6", "#2DD4BF"]}
          />
        </TransitionSeries.Sequence>

        {/* Fait 1: Introduction du problème */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HighlightFact
              emoji="❓"
              title="Une Question Simple"
              description="Combien de personnes faut-il dans une pièce pour avoir 50% de chances que deux d'entre elles aient le même anniversaire ?"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Fait 2: La réponse surprenante */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HighlightFact
              emoji="🎯"
              title="Seulement 23 personnes !"
              description="La réponse est bien plus petite que ce que la plupart des gens imaginent."
              delay={0}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Fait 3: L'explication */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HighlightFact
              emoji="🧮"
              title="La Magie des Probabilités"
              description="Ce paradoxe montre comment les probabilités peuvent être contre-intuitives et pourquoi les développeurs doivent en tenir compte."
              delay={0}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Conclusion */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <ModernTitle
            title="Les mathématiques nous surprennent !"
            emoji="🤯"
            gradient={["#6366F1", "#EC4899"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
