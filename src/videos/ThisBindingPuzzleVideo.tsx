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

export const ThisBindingPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="Tech Puzzle #4" subtitle="Le Piège du This" />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="Pourquoi ce code affiche-t-il undefined au lieu de 42?"
          codeExample={`class Counter {
  constructor() {
    this.count = 42;
  }

  start() {
    // Démarrer un timer
    setInterval(function() {
      console.log(this.count);
      this.count++;
    }, 1000);
  }
}

const counter = new Counter();
counter.start();
// Console: undefined
// Console: TypeError: Cannot read property 'count' of undefined`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={120}>
        <CountdownTimer
          seconds={4}
          message="Indice: Le contexte de 'this' change dans les callbacks classiques!"
        />
      </Sequence>

      <Sequence from={450} durationInFrames={300}>
        <Solution
          title="3 Solutions pour Fixer le This!"
          explanation="Dans une fonction classique, 'this' dépend de son contexte d'appel. Dans un callback, 'this' devient undefined (en mode strict) ou window. Les arrow functions, bind(), ou la capture de this résolvent ce problème."
          improvedCode={`class Counter {
  constructor() {
    this.count = 42;
  }

  // Solution 1: Arrow function
  start() {
    setInterval(() => {
      console.log(this.count);
      this.count++;
    }, 1000);
  }

  // Solution 2: Bind
  start2() {
    const callback = function() {
      console.log(this.count);
      this.count++;
    };
    setInterval(callback.bind(this), 1000);
  }

  // Solution 3: Capture this
  start3() {
    const self = this;
    setInterval(function() {
      console.log(self.count);
      self.count++;
    }, 1000);
  }
}

const counter = new Counter();
counter.start();
// Console: 42
// Console: 43
// Console: 44...`}
        />
      </Sequence>

      <Sequence from={750} durationInFrames={90}>
        <Outro
          message="Le binding de 'this' est un piège classique! Quelle solution préférez-vous utiliser dans votre code?"
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
        id="ThisBindingPuzzle"
        component={ThisBindingPuzzleVideo}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
