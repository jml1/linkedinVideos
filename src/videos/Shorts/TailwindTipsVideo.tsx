import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";

const beforeCode = `// 🤔 Before - Repetitive CSS
.card {
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`;

const afterCode = `// ✨ After - Clean Tailwind
<div class="m-4 p-6 rounded-lg bg-white 
  shadow-lg hover:shadow-xl 
  transition-shadow duration-300">
  {/* Your content */}
</div>`;

export const TailwindTipsVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Title - 60 frames */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Stop Writing CSS!"
            emoji="🚀"
            gradient={["#00B4DB", "#0083B0"]}
          />
        </TransitionSeries.Sequence>

        {/* Before Code - 120 frames */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <CodeSnippet code={beforeCode} />
        </TransitionSeries.Sequence>

        {/* After Code - 120 frames */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <CodeSnippet code={afterCode} />
        </TransitionSeries.Sequence>

        {/* Final Message - 60 frames */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Tailwind = Speed 🏃‍♂️"
            emoji="⚡️"
            gradient={["#FF0080", "#7928CA"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
