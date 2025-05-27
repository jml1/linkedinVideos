import { Composition } from "remotion";
import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  AbsoluteFill,
} from "remotion";
import React from "react";

import { Intro } from "./components/Intro";
import { PuzzlePresentation } from "./components/PuzzlePresentation";
import { CountdownTimer } from "./components/CountdownTimer";
import { Solution } from "./components/Solution";
import { Outro } from "./components/Outro";

export const NaNPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="Tech Puzzle #3" subtitle="Le Mystère du NaN" />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="Pourquoi ce code de validation retourne toujours false?"
          codeExample={`function validerAge(age) {
  // Conversion en nombre
  const ageNum = Number(age);
  
  // Vérification si l'âge est invalide
  if (ageNum === NaN) {
    return false;
  }
  
  // Vérification de l'intervalle
  return ageNum >= 18 && ageNum <= 120;
}

console.log(validerAge("25")); // true
console.log(validerAge("abc")); // devrait être false
console.log(validerAge("18")); // true
console.log(validerAge("150")); // false`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={120}>
        <CountdownTimer
          seconds={4}
          message="Indice: NaN est le seul nombre qui n'est pas égal à lui-même!"
        />
      </Sequence>

      <Sequence from={450} durationInFrames={300}>
        <Solution
          title="NaN === NaN est toujours false!"
          explanation="En JavaScript, NaN est la seule valeur qui n'est jamais égale à elle-même. Pour tester si une valeur est NaN, il faut utiliser Number.isNaN() ou la fonction isNaN()."
          improvedCode={`function validerAge(age) {
  // Conversion en nombre
  const ageNum = Number(age);
  
  // Vérification si l'âge est invalide
  if (Number.isNaN(ageNum)) {
    return false;
  }
  
  // Vérification de l'intervalle
  return ageNum >= 18 && ageNum <= 120;
}

// Tests
console.log(validerAge("25")); // true
console.log(validerAge("abc")); // false
console.log(validerAge("18")); // true
console.log(validerAge("150")); // false

// Démonstration du comportement de NaN
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true

// Autres cas surprenants
console.log(typeof NaN); // "number" 😱
console.log(NaN + 5); // NaN
console.log(0 / 0); // NaN`}
        />
      </Sequence>

      <Sequence from={750} durationInFrames={90}>
        <Outro
          message="Les pièges de JavaScript peuvent être surprenants! Quels autres comportements étranges connaissez-vous?"
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
        id="NaNPuzzle"
        component={NaNPuzzleVideo}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
