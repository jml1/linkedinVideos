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

export const MemoryLeakPuzzleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A2A" }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro title="Tech Puzzle #2" subtitle="Débusquer la Fuite Mémoire" />
      </Sequence>

      <Sequence from={90} durationInFrames={240}>
        <PuzzlePresentation
          question="Ce code cause une fuite mémoire importante. Saurez-vous identifier le problème?"
          codeExample={`class EventManager {
  constructor() {
    this.data = new Array(1000).fill('données');
  }
  
  setupListeners() {
    document.getElementById('btn')
      .addEventListener('click', () => {
        this.processData();
      });
  }
  
  processData() {
    console.log(this.data.length);
  }
}

// Utilisation
function initPage() {
  const manager = new EventManager();
  manager.setupListeners();
  
  // Changement de vue
  document.getElementById('btn').remove();
  initPage(); // Nouvelle instance
}`}
        />
      </Sequence>

      <Sequence from={330} durationInFrames={120}>
        <CountdownTimer
          seconds={4}
          message="Indice: À chaque changement de vue, la mémoire utilisée augmente..."
        />
      </Sequence>

      <Sequence from={450} durationInFrames={300}>
        <Solution
          title="Closures et Event Listeners: un piège classique!"
          explanation="Le gestionnaire d'événements créé dans setupListeners() maintient une référence à l'instance complète de EventManager via 'this'. Même si le bouton est supprimé du DOM, la référence à 'this.data' persiste, empêchant le garbage collector de libérer la mémoire."
          improvedCode={`class EventManager {
  constructor() {
    this.data = new Array(1000).fill('données');
    this.handleClick = this.handleClick.bind(this);
  }
  
  setupListeners() {
    document.getElementById('btn')
      .addEventListener('click', this.handleClick);
  }
  
  handleClick() {
    this.processData();
  }
  
  processData() {
    console.log(this.data.length);
  }
  
  cleanup() {
    document.getElementById('btn')
      ?.removeEventListener('click', this.handleClick);
  }
}

function initPage() {
  if (window.currentManager) {
    window.currentManager.cleanup();
  }
  window.currentManager = new EventManager();
  window.currentManager.setupListeners();
}`}
        />
      </Sequence>

      <Sequence from={750} durationInFrames={90}>
        <Outro
          message="Les fuites mémoire sont un problème réel en développement web! Quelles autres sources de fuites avez-vous rencontrées dans vos projets?"
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
        id="MemoryLeakPuzzle"
        component={MemoryLeakPuzzleVideo}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
