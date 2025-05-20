import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CosmosBackground } from "../../components/CosmosBackground";

// Composant pour les statistiques animées
const StatCard: React.FC<{
  title: string;
  value: string;
  icon: string;
  color: string;
  delay?: number;
}> = ({ title, value, icon, color, delay = 0 }) => {
  const frame = useCurrentFrame();

  const opacity = spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const scale = spring({
    frame: frame - delay,
    fps: 30,
    from: 0.8,
    to: 1,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        backgroundColor: `${color}22`,
        borderLeft: `4px solid ${color}`,
        borderRadius: "12px",
        padding: "1.5rem",
        margin: "0.8rem 0",
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <div style={{ fontSize: "3rem" }}>{icon}</div>
      <div>
        <div
          style={{
            color: "white",
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </div>
        <div style={{ color: color, fontSize: "2.2rem", fontWeight: "800" }}>
          {value}
        </div>
      </div>
    </div>
  );
};

// Composant pour les comparaisons visuelles
const ComparisonBar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  icon: string;
  color: string;
  delay?: number;
}> = ({ label, value, maxValue, icon, color, delay = 0 }) => {
  const frame = useCurrentFrame();

  const width = spring({
    frame: frame - delay,
    fps: 30,
    from: 0,
    to: (value / maxValue) * 100,
    config: { damping: 12 },
  });

  return (
    <div style={{ margin: "1.2rem 0", width: "90%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ fontSize: "1.8rem", marginRight: "0.5rem" }}>
          {icon}
        </span>
        <span style={{ color: "white", fontSize: "1.6rem" }}>{label}</span>
      </div>
      <div
        style={{
          height: "30px",
          backgroundColor: "#ffffff22",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            backgroundColor: color,
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "1rem",
            transition: "width 0.5s ease",
          }}
        >
          <span style={{ color: "white", fontWeight: "bold" }}>
            {value}g CO₂
          </span>
        </div>
      </div>
    </div>
  );
};

// Composant pour les solutions
const SolutionItem: React.FC<{
  text: string;
  icon: string;
  delay?: number;
}> = ({ text, icon, delay = 0 }) => {
  const frame = useCurrentFrame();

  const translateX = spring({
    frame: frame - delay,
    fps: 30,
    from: 50,
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
        alignItems: "center",
        gap: "1rem",
        margin: "1rem 0",
        transform: `translateX(${translateX}px)`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff22",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.8rem",
        }}
      >
        {icon}
      </div>
      <div style={{ color: "white", fontSize: "1.6rem" }}>{text}</div>
    </div>
  );
};

export const GreenCodeVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a192f" }}>
      <CosmosBackground />
      <TransitionSeries>
        {/* Titre principal */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Votre code pollue plus que vous ne pensez"
            emoji="🌍"
            gradient={["#22c55e", "#0ea5e9"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Statistiques choc */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <StatCard
              title="Internet global"
              value="3.8% des émissions mondiales"
              icon="🌐"
              color="#22c55e"
              delay={0}
            />
            <StatCard
              title="Une page web moyenne"
              value="1.76g CO₂ par visite"
              icon="📱"
              color="#0ea5e9"
              delay={20}
            />
            <StatCard
              title="JavaScript non optimisé"
              value="Jusqu'à +70% d'émissions"
              icon="⚠️"
              color="#f59e0b"
              delay={40}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Comparaisons */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "2.2rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Émissions CO₂ par activité
            </h2>
            <ComparisonBar
              label="Email avec pièce jointe"
              value={50}
              maxValue={200}
              icon="📧"
              color="#0ea5e9"
              delay={0}
            />
            <ComparisonBar
              label="1 heure de streaming HD"
              value={100}
              maxValue={200}
              icon="📺"
              color="#8b5cf6"
              delay={20}
            />
            <ComparisonBar
              label="Site web avec animations lourdes"
              value={150}
              maxValue={200}
              icon="🖥️"
              color="#f43f5e"
              delay={40}
            />
            <ComparisonBar
              label="Minage d'un NFT"
              value={200}
              maxValue={200}
              icon="🪙"
              color="#f59e0b"
              delay={60}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Solutions */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "2.2rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Solutions pour un code plus vert
            </h2>
            <div style={{ width: "90%" }}>
              <SolutionItem
                text="Optimiser les images et assets (-30% d'émissions)"
                icon="🖼️"
                delay={0}
              />
              <SolutionItem
                text="Réduire le JavaScript inutilisé (-60% d'émissions)"
                icon="📉"
                delay={20}
              />
              <SolutionItem
                text="Utiliser le lazy loading et le code splitting"
                icon="⚡"
                delay={40}
              />
              <SolutionItem
                text="Choisir des hébergeurs à énergie renouvelable"
                icon="♻️"
                delay={60}
              />
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Call to Action */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Mesurez l'impact de votre site maintenant"
            emoji="🌱"
            gradient={["#22c55e", "#0ea5e9"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
