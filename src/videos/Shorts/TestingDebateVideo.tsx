import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";

const commonTestCode = `// 🤔 Common tests that add no value
describe('UserService', () => {
  it('should create user', () => {
    const user = new User('john@doe.com');
    expect(user.email).toBe('john@doe.com');
  });
});

// These tests:
// ❌ Test the obvious
// ❌ Duplicate code
// ❌ Slow down development
// ❌ Expensive to maintain`;

const valuableTestCode = `// ✨ Tests that bring actual value
describe('PaymentService', () => {
  it('should handle network failures gracefully', () => {
    // Given
    mockStripeAPI.simulateTimeout();
    
    // When
    const result = await processPayment(1000);
    
    // Then
    expect(result.status).toBe('retrying');
    expect(notificationService.alertAdmin)
      .toHaveBeenCalled();
  });
});

// These tests:
// ✅ Document edge cases
// ✅ Prevent regressions
// ✅ Test real business logic
// ✅ Give team confidence`;

const modernTestingCode = `// 🚀 Modern Testing Approach

// 1. Test behavior, not implementation
test('user can purchase when stock available', () => {
  const { stock, cart, buy } = setupStore();
  
  buy('iPhone', 1);
  
  expect(cart.total).toBe(999);
  expect(stock.iPhone).toBe(9);
});

// 2. Strategic E2E tests
test('critical user journey', () => {
  cy.login('user')
    .addToCart('iPhone')
    .checkout()
    .verifyOrderConfirmation();
});

// 3. Performance thresholds
test('checkout under 2 seconds', async () => {
  const start = performance.now();
  await processCheckout();
  expect(performance.now() - start).toBeLessThan(2000);
});`;

export const TestingDebateVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="Are Unit Tests a Waste of Time?"
            emoji="🤔"
            gradient={["#FF6B6B", "#4ECDC4"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Bad Tests */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={commonTestCode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Good Tests */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={valuableTestCode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Modern Approach */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={modernTestingCode} theme="dark" />
        </TransitionSeries.Sequence>

        {/* Provocative Ending */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <ModernTitle
            title="Do you test everything?"
            emoji="🧪"
            gradient={["#A8E6CF", "#FF8B94"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
