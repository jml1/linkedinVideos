import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ModernTitle } from "./components/ModernTitle";
import { CodeSnippet } from "./components/CodeSnippet";

const overengineeredCode = `// 😱 Over-engineered TypeScript
type UserRole = 'admin' | 'user' | 'guest';
type Permission = 'read' | 'write' | 'delete';

interface UserPermissionConfig<T extends UserRole> {
  role: T;
  permissions: T extends 'admin' 
    ? Permission[]
    : T extends 'user'
    ? Exclude<Permission, 'delete'>[]
    : Extract<Permission, 'read'>[];
}

// Just to check if user can read...
function canUserRead<T extends UserRole>(
  config: UserPermissionConfig<T>
): boolean {
  return config.permissions.includes('read');
}

// 🤦‍♂️ Too much complexity for simple things`;

const practicalCode = `// ✨ Practical TypeScript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
}

// Type inference does the heavy lifting
const users = await db.getUsers();
const admins = users.filter(u => u.role === 'admin');

// Autocomplete and error catching
function promoteUser(user: User) {
  if (user.role === 'guest') {
    user.role = 'user';  // TS knows it's safe
  }
}

// 👍 Just enough type safety`;

const modernCode = `// 🚀 Modern TypeScript Best Practices

// 1. Zod for runtime validation
const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

// Type is inferred automatically!
type User = z.infer<typeof UserSchema>;

// 2. Partial updates made easy
type UpdateUserDto = Partial<
  Omit<User, 'id' | 'createdAt'>
>;

// 3. API response handling
async function fetchUser(id: string) {
  const response = await api.get<User>(\`/users/\${id}\`);
  return response.data;
}

// 4. No more undefined errors
const username = user?.profile?.name ?? 'Anonymous';`;

export const TypeScriptDebateVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <ModernTitle
            title="TypeScript: Overengineering?"
            emoji="🤔"
            gradient={["#6366F1", "#2DD4BF"]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Overengineered Example */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={overengineeredCode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Practical Example */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={practicalCode} theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Modern Approach */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CodeSnippet code={modernCode} theme="dark" />
        </TransitionSeries.Sequence>

        {/* Provocative Ending */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <ModernTitle
            title="How much typing is too much?"
            emoji="⚡️"
            gradient={["#3B82F6", "#EC4899"]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
