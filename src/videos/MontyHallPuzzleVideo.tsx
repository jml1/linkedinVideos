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

export const MontyHallPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="Tech Puzzle #3" subtitle="Le Paradoxe de Monty Hall" />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="Dans un jeu télévisé, trois portes dont une cache une voiture. Après avoir choisi une porte, le présentateur en ouvre une autre, vide. Devez-vous changer votre choix initial?"
          codeExample={`function simulerMontyHall(strategie) {\n  // 'garder' ou 'changer'\n  const portePrix = Math.floor(Math.random() * 3); // 0, 1 ou 2\n  const choixInitial = Math.floor(Math.random() * 3);\n  \n  // Le présentateur ouvre une porte vide\n  let porteOuverte;\n  do {\n    porteOuverte = Math.floor(Math.random() * 3);\n  } while (porteOuverte === portePrix || porteOuverte === choixInitial);\n  \n  if (strategie === 'garder') {\n    return choixInitial === portePrix; // Victoire si choix initial correct\n  } else { // 'changer'\n    const nouveauChoix = 3 - choixInitial - porteOuverte; // De 0,1,2, trouver celui restant\n    return nouveauChoix === portePrix; // Victoire si nouveau choix correct\n  }\n}`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={150}>
        <CountdownTimer
          seconds={5}
          message="Alors, Garder ou Changer? Commentez votre intuition!"
        />
      </Sequence>

      <Sequence from={480} durationInFrames={270}>
        <Solution
          title="Changer double vos chances!"
          explanation="Contre-intuitivement, changer de porte augmente vos chances de gagner de 1/3 à 2/3. Initialement, vous avez 1/3 de chance d'avoir choisi la bonne porte et 2/3 de chance qu'elle soit ailleurs. Quand le présentateur révèle une porte vide, ces 2/3 de probabilité se concentrent sur la porte restante."
          improvedCode={`function simulerExperience(nombreEssais) {\n  let victoires = {\n    garder: 0,\n    changer: 0\n  };\n  \n  for (let i = 0; i < nombreEssais; i++) {\n    if (simulerMontyHall('garder')) victoires.garder++;\n    if (simulerMontyHall('changer')) victoires.changer++;\n  }\n  \n  return {\n    garder: (victoires.garder / nombreEssais) * 100,\n    changer: (victoires.changer / nombreEssais) * 100\n  };\n}\n\n// Résultat avec 10,000 simulations:\n// { garder: ~33.3%, changer: ~66.6% }`}
        />
      </Sequence>

      <Sequence from={750} durationInFrames={90}>
        <Outro
          message="Ce paradoxe a provoqué des débats intense même parmi les mathématiciens! Quelle stratégie auriez-vous choisie intuitivement?"
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
        id="MontyHallPuzzle"
        component={MontyHallPuzzleVideo}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
