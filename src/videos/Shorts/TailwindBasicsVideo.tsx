import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";

const spacingCode = `// 🔍 Spacing in Tailwind
<div class="m-4">    /* margin: 1rem */
<div class="p-6">    /* padding: 1.5rem */
<div class="mt-2">   /* margin-top: 0.5rem */
<div class="px-4">   /* padding left/right: 1rem */`;

const flexboxCode = `// 💪 Flexbox Made Easy
<div class="flex items-center justify-between">
  <div class="flex-1">Auto grow</div>
  <div class="flex-shrink-0">Stay same</div>
</div>

// Center anything perfectly
<div class="flex items-center justify-center h-screen">
  <div>I'm centered!</div>
</div>`;

const colorsCode = `// 🎨 Modern Color System
<button class="bg-blue-500    /* Base color */
             hover:bg-blue-600 /* Darker on hover */
             text-white        /* White text */
             disabled:opacity-50">
  Click me
</button>

// Using opacity variants
<div class="bg-black/50">  /* 50% opacity */
<div class="bg-white/80">  /* 80% opacity */`;

const responsiveCode = `// 📱 Responsive Design
<div class="text-sm     /* Base size */
            md:text-base /* Medium screens */
            lg:text-lg   /* Large screens */
            xl:text-xl"> /* Extra large */
  Responsive text
</div>

// Mobile-first approach
<div class="flex-col     /* Stack on mobile */
            md:flex-row"> /* Row on desktop */`;

export const TailwindBasicsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = spring({
    frame,
    fps: 30,
    from: 0.95,
    to: 1,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Intro Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Tailwind CSS Basics"
            emoji="✨"
            gradient={["#00B4DB", "#0083B0"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Spacing Section */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Spacing System"
            emoji="📏"
            gradient={["#4A00E0", "#8E2DE2"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill
            style={{
              transform: `scale(${zoom})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeSnippet code={spacingCode} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Flexbox Section */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Flexbox Magic"
            emoji="💫"
            gradient={["#F857A6", "#FF5858"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill
            style={{
              transform: `scale(${zoom})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeSnippet code={flexboxCode} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Colors Section */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Color System"
            emoji="🎨"
            gradient={["#11998e", "#38ef7d"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill
            style={{
              transform: `scale(${zoom})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeSnippet code={colorsCode} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Responsive Section */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Responsive Design"
            emoji="📱"
            gradient={["#FC466B", "#3F5EFB"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill
            style={{
              transform: `scale(${zoom})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeSnippet code={responsiveCode} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Outro */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Start Using Tailwind!"
            emoji="🚀"
            gradient={["#FF0080", "#7928CA"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
