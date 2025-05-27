import { Composition } from "remotion";
import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  AbsoluteFill,
} from "remotion";
import React from "react";

// Composants pour les différentes sections
import { Intro } from "./components/Intro";
import { PuzzlePresentation } from "./components/PuzzlePresentation";
import { CountdownTimer } from "./components/CountdownTimer";
import { Solution } from "./components/Solution";
import { Outro } from "./components/Outro";

export const BirthdayPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro
          title="Tech Puzzle #2"
          subtitle="Le Paradoxe du Birthday Attack"
        />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="Combien de personnes faut-il pour avoir 50% de chance que deux partagent le même anniversaire?"
          codeExample={`function calculerProbabilite(nombrePersonnes) {\n  // Probabilité qu'aucune paire ne partage un anniversaire\n  let probabiliteAucunDouble = 1;\n  \n  for (let i = 0; i < nombrePersonnes; i++) {\n    probabiliteAucunDouble *= (365 - i) / 365;\n  }\n  \n  // Probabilité qu'au moins une paire partage un anniversaire\n  return (1 - probabiliteAucunDouble) * 100;\n}`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={150}>
        <CountdownTimer
          seconds={5}
          message="Réfléchissez et commentez votre réponse!"
        />
      </Sequence>

      <Sequence from={420} durationInFrames={270}>
        <Solution
          title="Seulement 23 personnes!"
          explanation="Ce résultat contre-intuitif s'explique par le fait qu'on ne cherche pas une date spécifique, mais n'importe quelle correspondance parmi toutes les paires possibles. Cette attaque est utilisée en cryptographie pour trouver des collisions de hash."
          improvedCode={`function birthdayAttack(probabiliteRecherchee, espace) {\n  // espace = taille de l'espace (ex: 365 pour les jours)\n  // Formule: sqrt(2 * espace * ln(1/(1-p)))\n  \n  return Math.ceil(\n    Math.sqrt(\n      2 * espace * Math.log(1 / (1 - probabiliteRecherchee/100))\n    )\n  );\n}\n\n// Pour une probabilité de 50% avec 365 jours:\nconsole.log(birthdayAttack(50, 365)); // Résultat: 23`}
        />
      </Sequence>

      <Sequence from={690} durationInFrames={90}>
        <Outro
          message="Cette attaque est utilisée pour casser des algorithmes cryptographiques! Commentez d'autres paradoxes mathématiques que vous connaissez."
          profileLink="linkedin.com/in/jamal-ouali-akaou-2091b11ba/"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="BirthdayPuzzle"
        component={BirthdayPuzzleVideo}
        durationInFrames={780}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
