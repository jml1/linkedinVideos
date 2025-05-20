import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";

const bugCode = `// 🚨 Common Production Bug
function SearchComponent() {
  const [query, setQuery] = useState("");
  
  // Bug: Closure captures old 'query' value
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("Searching for:", query);
      searchAPI(query);
    }, 500);
    
    return () => clearTimeout(handler);
  }, []); // 😱 Missing dependency

  return <input onChange={e => setQuery(e.target.value)} />;
}

// Result: Search always uses initial empty query
// Thousands of users affected!`;

const solutionCode = `// ✨ Production-Ready Solution
function SearchComponent() {
  const [query, setQuery] = useState("");
  
  // Solution: Proper closure handling
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("Searching for:", query);
      searchAPI(query);
    }, 500);
    
    return () => clearTimeout(handler);
  }, [query]); // ✅ Correct dependency

  return <input onChange={e => setQuery(e.target.value)} />;
}

// Result: 
// - Proper debouncing
// - Memory leak prevention
// - Correct state handling`;

const realWorldCode = `// 🚀 Used at Scale
// Amazon's Product Search Implementation
const useDebounceSearch = (initialDelay = 500) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Production-grade closure pattern
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const data = await searchAPI(query);
        setResults(data);
        analytics.track('search_performed', { query });
      } catch (error) {
        errorReporting.log(error);
      } finally {
        setLoading(false);
      }
    }, initialDelay);

    return () => clearTimeout(handler);
  }, [query, initialDelay]);

  return { query, setQuery, results, loading };
};`;

export const ClosuresExplainedVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Hook */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="90% des bugs en prod sont liés aux closures"
            emoji="🚨"
            gradient={["#FF4B4B", "#FF9B4B"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Problem */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <CodeSnippet code={bugCode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Solution */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <CodeSnippet code={solutionCode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Real World Example */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <CodeSnippet code={realWorldCode} theme="dark" />
        </TransitionSeries.Sequence>

        {/* Call to Action */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Suivez-moi pour plus de tips d'architecture React"
            emoji="🚀"
            gradient={["#3B82F6", "#2DD4BF"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
