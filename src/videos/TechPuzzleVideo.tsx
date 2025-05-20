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

export const TechPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="Tech Puzzle #1" subtitle="Problème d'algorithme" />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="Comment optimiser cette fonction de recherche?"
          codeExample={`function search(array, target) {\n  // Code à optimiser\n  for(let i = 0; i < array.length; i++) {\n    if(array[i] === target) return i;\n  }\n  return -1;\n}`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={90}>
        <CountdownTimer seconds={3} message="Réfléchissez et commentez!" />
      </Sequence>

      <Sequence from={420} durationInFrames={270}>
        <Solution
          title="Solution optimisée"
          explanation="En utilisant la recherche binaire, nous pouvons réduire la complexité de O(n) à O(log n)"
          improvedCode={`function binarySearch(array, target) {\n  let left = 0;\n  let right = array.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (array[mid] === target) return mid;\n    if (array[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  \n  return -1;\n}`}
        />
      </Sequence>

      <Sequence from={690} durationInFrames={90}>
        <Outro
          message="Commentez votre solution et partagez!"
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
        id="TechPuzzle"
        component={TechPuzzleVideo}
        durationInFrames={780}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
