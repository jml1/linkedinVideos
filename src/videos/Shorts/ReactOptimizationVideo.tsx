import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";
import { AnimatedBar } from "./components/AnimatedBar";
import { CosmosBackground } from "../../components/CosmosBackground";

const badCode = `// 🚨 Performance Nightmare
import { useState, useEffect } from 'react';

// 🐌 Slow Component
function ProductList({ products }) {
  // 1. Expensive Calculations 😱
  const filtered = products
    .filter(p => p.price > 100)     // O(n)
    .sort((a, b) => b.rating - a.rating)  // O(n log n)
    .map(transformProduct);         // O(n)

  // 2. Memory Leak 💀
  useEffect(() => {
    const onScroll = () => {
      checkVisibility(filtered); // Closure trap!
    };
    window.addEventListener('scroll', onScroll);
    // 🔴 No cleanup
  }, []); // Missing deps

  // 3. Performance Anti-patterns 🐌
  return (
    <div className="grid">
      {/* 🔴 Unnecessary Re-renders */}
      {filtered.map(p => (
        <ProductCard {...p} /> // 🔴 Props drilling
      ))}
    </div>
  );
}`;

const optimizedCode = `// ✨ Optimized Version
import { useState, useEffect, useMemo } from 'react';

// 🚀 Fast Component
function ProductList({ products }) {
  // 1. Memoized Calculations ⚡️
  const filtered = useMemo(() => 
    products
      .filter(p => p.price > 100)
      .sort((a, b) => b.rating - a.rating),
    [products] // ✅ Proper deps
  );

  // 2. Clean Events 🧹
  useEffect(() => {
    const onScroll = () => checkVisibility(filtered);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [filtered]);

  // 3. Optimized Rendering ✨
  return (
    <div className="grid">
      {/* ✅ Performant List */}
      {filtered.map(p => (
        <MemoizedCard product={p} /> // ✅ Clean props
      ))}
    </div>
  );
}`;

export const ReactOptimizationVideo: React.FC = () => {
  const performanceMetrics = [
    { label: "Bundle Size", before: 2.8, after: 0.89, unit: "MB" },
    { label: "Render Time", before: 3.2, after: 0.8, unit: "s" },
    { label: "Memory Usage", before: 180, after: 45, unit: "MB" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a15" }}>
      <CosmosBackground />
      <TransitionSeries>
        {/* Main Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Your React App is Bleeding Performance"
            emoji="🚨"
            gradient={["#FF4B4B", "#FF9B4B"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Problem Title */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Common Performance Killers"
            emoji="💀"
            gradient={["#FF0080", "#7928CA"]}
          />
        </TransitionSeries.Sequence>

        {/* Bad Code */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <div style={{ width: "100%", maxHeight: "80vh" }}>
              <CodeSnippet
                code={badCode}
                theme="dark"
                fontSize={24} // Ajuster selon besoin
              />
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Solution Title */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Production-Ready Solution"
            emoji="✨"
            gradient={["#00B4DB", "#0083B0"]}
          />
        </TransitionSeries.Sequence>

        {/* Optimized Code */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <div style={{ width: "100%", maxHeight: "80vh" }}>
              <CodeSnippet
                code={optimizedCode}
                theme="dark"
                fontSize={24} // Ajuster selon besoin
              />
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Results Title */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <ModernTitle
            title="Real Performance Gains"
            emoji="📈"
            gradient={["#7928CA", "#FF0080"]}
          />
        </TransitionSeries.Sequence>

        {/* Performance Metrics */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {performanceMetrics.map((metric, i) => (
              <AnimatedBar
                key={metric.label}
                label={metric.label}
                beforeValue={metric.before}
                afterValue={metric.after}
                unit={metric.unit}
                delay={i * 15}
              />
            ))}
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Call to Action */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Follow for More React Pro Tips"
            emoji="🚀"
            gradient={["#3B82F6", "#2DD4BF"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
