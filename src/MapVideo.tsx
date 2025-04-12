import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import { CodeEditor } from "./components/CodeEditor";
import { Title } from "./components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { CosmosBackground } from "./components/CosmosBackground";

// ES6 Map Implementation
const mapImplementationCode = `// The real Array.prototype.map() implementation
Array.prototype.map = function(callback, thisArg) {
  // 1. Handle null and undefined
  if (this == null) {
    throw new TypeError('this is null or undefined');
  }

  // 2. Ensure callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // 3. Convert this to Object and get its length
  const O = Object(this);
  const len = O.length >>> 0;

  // 4. Initialize the new array
  const A = new Array(len);

  // 5. Iterate and apply callback
  for (let k = 0; k < len; k++) {
    if (k in O) {
      // Get current value
      const kValue = O[k];
      
      // Execute callback with proper context
      const mappedValue = callback.call(thisArg, kValue, k, O);
      
      // Set the value in new array
      A[k] = mappedValue;
    }
  }

  // 6. Return the new array
  return A;
};`;

// Examples with detailed explanations
const examplesCode = `// Let's explore some powerful use cases of map()

// Example 1: Transform numbers
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(num => num ** 2);
console.log('Squares:', squares);
// Output: [1, 4, 9, 16, 25]

// Example 2: Working with objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

const userNames = users.map(user => user.name);
console.log('Names:', userNames);
// Output: ['John', 'Jane', 'Bob']

// Example 3: Using index parameter
const indexed = numbers.map((num, idx) => ({
  value: num,
  index: idx,
  isEven: num % 2 === 0
}));
console.log('With metadata:', indexed);
// Output: [{value: 1, index: 0, isEven: false}, ...]

// Example 4: Chaining with other methods
const sumOfSquares = numbers
  .map(num => num ** 2)
  .filter(square => square > 10)
  .reduce((sum, square) => sum + square, 0);
console.log('Sum of squares > 10:', sumOfSquares);
// Output: 341`;

export const MapVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom animation for implementation
  const zoomScale = spring({
    frame: frame - 600, // Start zoom after implementation is written
    fps: 30,
    config: {
      damping: 15,
      stiffness: 130,
      mass: 0.8,
    },
    from: 1,
    to: 1.2,
  });

  return (
    <AbsoluteFill>
      <CosmosBackground />
      <TransitionSeries>
        {/* Title Sequence - 150 frames */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <Title
            title="Array.prototype.map()"
            subtitle="Deep dive into ES6 implementation"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Implementation - 600 frames */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <AbsoluteFill
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: "center center",
            }}
          >
            <CodeEditor
              initialCode={mapImplementationCode}
              typingSpeed={1.2}
              showLineNumbers={true}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({
            durationInFrames: 45,
            config: {
              damping: 15,
              stiffness: 130,
              mass: 0.8,
            },
          })}
        />

        {/* Examples - 975 frames */}
        <TransitionSeries.Sequence durationInFrames={975}>
          <CodeEditor
            initialCode={examplesCode}
            typingSpeed={1}
            showLineNumbers={true}
            highlightOutput={true}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
