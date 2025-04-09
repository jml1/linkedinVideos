import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CodeBlock } from "./components/CodeBlock";
import { Title } from "./components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";

export const MapVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
        fontFamily: "SF Pro Display, system-ui, sans-serif",
      }}
    >
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <Title
            title="Array.prototype.map()"
            subtitle="Comment ça marche vraiment ?"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({
            durationInFrames: 30,
            fps: 30,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeBlock
            code={`// Définition de la méthode map sur le prototype Array
Array.prototype.map = function(callback) {
  // Vérification que callback est une fonction
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  // Création du tableau résultat
  const result = [];`}
            language="javascript"
            title="Étape 1: Initialisation"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({
            durationInFrames: 30,
            fps: 30,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeBlock
            code={`  // Récupération du this (le tableau source)
  const arr = this;
  const len = arr.length;

  // Récupération du thisArg (contexte d'exécution)
  const thisArg = arguments[1];

  // Parcours du tableau source
  for (let i = 0; i < len; i++) {
    if (i in arr) {  // Vérifie si l'index existe`}
            language="javascript"
            title="Étape 2: Préparation de l'itération"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({
            durationInFrames: 30,
            fps: 30,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeBlock
            code={`      // Appel de la callback avec les bons arguments
      const mappedValue = callback.call(
        thisArg,    // contexte d'exécution
        arr[i],     // élément courant
        i,          // index
        arr         // tableau source
      );

      // Stockage de la valeur transformée
      result[i] = mappedValue;
    }
  }`}
            language="javascript"
            title="Étape 3: Transformation des éléments"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({
            durationInFrames: 30,
            fps: 30,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={150}>
          <CodeBlock
            code={`  // Retourne le nouveau tableau
  return result;
};

// Exemple d'utilisation:
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2);
// doubled = [2, 4, 6]`}
            language="javascript"
            title="Étape 4: Finalisation"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
