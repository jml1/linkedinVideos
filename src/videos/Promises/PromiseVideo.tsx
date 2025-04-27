import React from "react";
import { AbsoluteFill } from "remotion";
import { CodeEditor } from "../../components/CodeEditor";
import { Title } from "../../components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ColorExplosion } from "../../components/ColorExplosion";

const promiseAllCode = `// Understanding Promise.all() vs Promise.allSettled()

// Example data
const userIds = [1, 2, 3, 4, 5];

// Simulated API calls
const fetchUser = async (id) => {
  if (id === 3) throw new Error('User not found');
  return { id, name: \`User \${id}\` };
};

// Promise.all() - Fails Fast
try {
  console.log('Starting Promise.all()...');
  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );
  console.log('Success:', users);
} catch (error) {
  console.log('Failed:', error.message);
  // Output: Failed: User not found
}

// Promise.allSettled() - Handles All Results
const results = await Promise.allSettled(
  userIds.map(id => fetchUser(id))
);

const succeeded = results
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value);

const failed = results
  .filter(r => r.status === 'rejected')
  .map(r => r.reason);

console.log('Succeeded:', succeeded);
// Output: [User 1, User 2, User 4, User 5]
console.log('Failed:', failed);
// Output: [Error: User not found]`;

const promiseRaceCode = `// Understanding Promise.race() vs Promise.any()

// Simulated API calls with different delays
const fetchData = async (api, delay) => {
  await new Promise(r => setTimeout(r, delay));
  if (api === 'API 2') throw new Error('API 2 failed');
  return \`Data from \${api}\`;
};

// Promise.race() - Takes First Settlement
try {
  console.log('Starting Promise.race()...');
  const result = await Promise.race([
    fetchData('API 1', 2000),
    fetchData('API 2', 1000), // Fails faster
    fetchData('API 3', 3000)
  ]);
  console.log('Success:', result);
} catch (error) {
  console.log('Failed:', error.message);
  // Output: Failed: API 2 failed
}

// Promise.any() - Takes First Success
try {
  console.log('Starting Promise.any()...');
  const result = await Promise.any([
    fetchData('API 1', 2000),
    fetchData('API 2', 1000), // Failure ignored
    fetchData('API 3', 3000)
  ]);
  console.log('Success:', result);
  // Output: Success: Data from API 1
} catch (error) {
  console.log('Failed:', error.errors);
}`;

export const PromiseVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      <TransitionSeries>
        {/* Main Title with color explosion */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Promise Combinators"
              subtitle="Master Promise.all(), allSettled(), race(), and any()"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Promise.all Title */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Promise.all() vs Promise.allSettled()"
              subtitle="Handling Multiple Promises Together"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Promise.all vs Promise.allSettled Code */}
        <TransitionSeries.Sequence durationInFrames={800}>
          <CodeEditor
            initialCode={promiseAllCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            highlightOutput={true}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Promise.race Title */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Promise.race() vs Promise.any()"
              subtitle="Racing and Competing Promises"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Promise.race vs Promise.any Code */}
        <TransitionSeries.Sequence durationInFrames={800}>
          <CodeEditor
            initialCode={promiseRaceCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            highlightOutput={true}
          />
        </TransitionSeries.Sequence>

        {/* Final Summary Title */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Choose Wisely!"
              subtitle="Each Combinator Has Its Perfect Use Case"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
