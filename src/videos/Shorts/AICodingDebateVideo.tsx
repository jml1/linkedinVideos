import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";

const badAICode = `// 😱 AI Generated Code Problems

// 1. Hallucinated Dependencies
import { nonExistentPackage } from 'fake-package';
import { magicFunction } from './utils';

// 2. Security Nightmares
const userInput = req.body.data;
eval(userInput); // AI doesn't understand security

// 3. Outdated Patterns
var that = this;
$.ajax({
  success: function() {
    that.setState({ loading: false });
  }
});

// 4. Redundant Code
const data = data.filter(item => {
  if (item.valid === true) {
    return true;
  } else {
    return false;
  }
});`;

const goodAICode = `// ✨ Smart AI Usage

// 1. Boilerplate Generation
interface UserDTO {
  id: string;
  email: string;
  profile: {
    name: string;
    avatar: string;
    preferences: string[];
  };
}

// 2. Test Cases Generation
describe('UserService', () => {
  test('should handle invalid email', () => {
    expect(() => 
      validateEmail('not-an-email')
    ).toThrow('Invalid email');
  });
});

// 3. Documentation
/**
 * Processes user data with rate limiting
 * @throws {RateLimitError} When quota exceeded
 * @returns {Promise<ProcessedData>}
 */`;

const modernApproach = `// 🚀 AI-Human Collaboration

// 1. AI for Complex Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 2. AI for Algorithm Optimization
function optimizedSearch(data, target) {
  const map = new Map();
  return data.reduce((acc, val, idx) => {
    const complement = target - val;
    if (map.has(complement)) {
      return [map.get(complement), idx];
    }
    map.set(val, idx);
    return acc;
  }, []);
}

// 3. AI for Code Reviews
// 🤖 Suggestions:
// - Add error handling
// - Consider caching
// - Add type safety
// - Improve performance

// 4. Human Expertise Required
function businessLogic() {
  // Complex domain knowledge
  // Strategic decisions
  // Architecture choices
  // Security considerations
}`;

export const AICodingDebateVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="AI Coding: Friend or Foe?"
            emoji="🤖"
            gradient={["#FF0080", "#7928CA"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Bad AI Usage */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={badAICode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Good AI Usage */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={goodAICode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Modern Approach */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={modernApproach} theme="dark" />
        </TransitionSeries.Sequence>

        {/* Provocative Ending */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <ModernTitle
            title="Will AI Replace Developers?"
            emoji="🤔"
            gradient={["#00B4DB", "#0083B0"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
