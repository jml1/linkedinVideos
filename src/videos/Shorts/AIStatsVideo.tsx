import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CosmosBackground } from "../../components/CosmosBackground";

// Composant pour les révélations choc
const RevealFact: React.FC<{
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

export const AIStatsVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a192f" }}>
      <CosmosBackground />
      <TransitionSeries>
        {/* Intro */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="L'IA dépasse l'humain dans 3 domaines clés"
            emoji="🤖"
            gradient={["#3B82F6", "#2DD4BF"]}
          />
        </TransitionSeries.Sequence>

        {/* Fait 1: Vision */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RevealFact
              emoji="👁️"
              title="L'IA détecte les cancers mieux que les médecins"
              description="Les modèles de vision repèrent des tumeurs invisibles à l'œil humain sur les scanners médicaux"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Fait 2: Langage */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RevealFact
              emoji="🗣️"
              title="GPT-4 réussit le barreau américain"
              description="L'IA maîtrise désormais le raisonnement juridique complexe et la nuance du langage"
              delay={0}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Fait 3: Créativité */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RevealFact
              emoji="🎨"
              title="DALL-E crée des œuvres d'art uniques"
              description="L'IA génère des images qui gagnent des concours d'art internationaux"
              delay={0}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Conclusion */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <ModernTitle
            title="L'IA n'est plus de la science-fiction"
            emoji="🚀"
            gradient={["#6366F1", "#EC4899"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
