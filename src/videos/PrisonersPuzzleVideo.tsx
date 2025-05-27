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

export const PrisonersPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro
          title="Tech Puzzle #4"
          subtitle="Le Problème des 100 Prisonniers"
        />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="100 prisonniers doivent trouver leur numéro dans 100 tiroirs. Chacun peut ouvrir 50 tiroirs. Ils gagnent leur liberté si TOUS réussissent. Quelle stratégie leur donne >30% de chances?"
          codeExample={`function stratégieAléatoire() {\n  // Simulation avec 100 prisonniers\n  // Chaque prisonnier ouvre 50 tiroirs au hasard\n  \n  // Mélange aléatoire des numéros dans les tiroirs\n  const tiroirs = [...Array(100).keys()].sort(() => Math.random() - 0.5);\n  \n  // Pour chaque prisonnier\n  for (let prisonnier = 0; prisonnier < 100; prisonnier++) {\n    // Sélectionne 50 tiroirs aléatoirement\n    const tiroirsOuverts = new Set();\n    while (tiroirsOuverts.size < 50) {\n      tiroirsOuverts.add(Math.floor(Math.random() * 100));\n    }\n    \n    // Vérifie si le prisonnier trouve son numéro\n    const trouvé = [...tiroirsOuverts].some(tiroir => tiroirs[tiroir] === prisonnier);\n    \n    if (!trouvé) return false; // Un seul échec = tous échouent\n  }\n  \n  return true; // Tous ont réussi\n}`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={150}>
        <CountdownTimer
          seconds={5}
          message="Une stratégie aléatoire donne seulement 0.0000000008% de chances! Quelle stratégie pourrait marcher?"
        />
      </Sequence>

      <Sequence from={480} durationInFrames={300}>
        <Solution
          title="La stratégie des cycles: 31.2% de chances!"
          explanation="Si chaque prisonnier commence par le tiroir de son propre numéro, puis suit le cycle (ouvre le tiroir du numéro trouvé), ils ont ~31% de chances de tous réussir! Ce résultat contre-intuitif s'explique par la théorie des permutations et des cycles."
          improvedCode={`function stratégieCycles() {\n  // Mélange aléatoire des numéros dans les tiroirs\n  const tiroirs = [...Array(100).keys()].sort(() => Math.random() - 0.5);\n  \n  // Décompose la permutation en cycles\n  const cycles = [];\n  const visités = new Set();\n  \n  for (let départ = 0; départ < 100; départ++) {\n    if (visités.has(départ)) continue;\n    \n    const cycle = [];\n    let courant = départ;\n    \n    while (!visités.has(courant)) {\n      visités.add(courant);\n      cycle.push(courant);\n      courant = tiroirs[courant]; // Suivre le cycle\n    }\n    \n    if (cycle.length > 0) cycles.push(cycle);\n  }\n  \n  // Si un cycle est plus long que 50, les prisonniers échoueront\n  return cycles.every(cycle => cycle.length <= 50);\n}\n\n// Simulation sur 100,000 essais: ~31.2% de succès`}
        />
      </Sequence>

      <Sequence from={780} durationInFrames={90}>
        <Outro
          message="Ce problème illustre comment une structure cachée peut être exploitée en informatique. Application réelle: conception d'algorithmes de recherche efficaces!"
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
        id="PrisonersPuzzle"
        component={PrisonersPuzzleVideo}
        durationInFrames={870}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
