import React from "react";
import { AbsoluteFill } from "remotion";
import { CodeEditor } from "../../components/CodeEditor";
import { Title } from "../../components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ColorExplosion } from "../../components/ColorExplosion";

// Pick Type Example
const pickTypeCode = `// Pick<Type, Keys> - Cherry-pick properties you need

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// 🎯 Only expose safe user data
type PublicUser = Pick<User, 'id' | 'name'>;

// ✨ Real-world usage
const displayUser = (user: PublicUser) => {
  console.log(\`User \${user.id}: \${user.name}\`);
  // No access to sensitive data like password!
};

// 🔒 Perfect for API responses
const safeUserData: PublicUser = {
  id: 1,
  name: 'John Doe'
  // TypeScript Error: password not allowed!
};`;

// Omit Type Example
const omitTypeCode = `// Omit<Type, Keys> - Exclude properties you don't want

interface Product {
  id: number;
  name: string;
  price: number;
  internalSKU: string;
  stockLevel: number;
}

// 🎯 Hide internal details
type PublicProduct = Omit<Product, 
  'internalSKU' | 'stockLevel'
>;

// ✨ Perfect for public APIs
const getProductInfo = (product: PublicProduct) => {
  return {
    ...product,
    formattedPrice: \`$\${product.price.toFixed(2)}\`
  };
};

// 🛍️ Safe for client exposure
const displayProduct: PublicProduct = {
  id: 1,
  name: 'Cool Gadget',
  price: 99.99
};`;

// Partial Type Example
const partialTypeCode = `// Partial<Type> - Make all properties optional

interface TaskData {
  title: string;
  description: string;
  dueDate: Date;
  priority: number;
}

// 🎯 Perfect for updates
type TaskUpdate = Partial<TaskData>;

// ✨ Real-world PATCH endpoint
const updateTask = (
  taskId: number, 
  updates: TaskUpdate
) => {
  // Only update provided fields
  const task = {
    title: 'Original Task',
    description: 'Initial desc',
    dueDate: new Date(),
    priority: 1,
    ...updates
  };
  console.log('Updated:', task);
};

// 🚀 Update only what changed
updateTask(1, {
  priority: 2,
  // Other fields optional!
});`;

// Required Type Example
const requiredTypeCode = `// Required<Type> - Make all properties mandatory

interface ConfigOptions {
  apiKey?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

// 🎯 Ensure all options are set
type CompleteConfig = Required<ConfigOptions>;

// ✨ Validate configuration
const validateConfig = (
  config: CompleteConfig
) => {
  // TypeScript ensures all properties exist
  console.log(\`
    API Key: \${config.apiKey}
    Timeout: \${config.timeout}ms
    Retries: \${config.retries}
    Debug: \${config.debug}
  \`);
};

// 🔒 Must provide all options
const fullConfig: CompleteConfig = {
  apiKey: 'abc123',
  timeout: 5000,
  retries: 3,
  debug: true
  // TypeScript Error if any field missing!
};`;

// ReturnType Example
const returnTypeCode = `// ReturnType<Type> - Extract the return type of a function

// 🎯 Complex function return type
function fetchUserData(id: number) {
  return {
    id,
    name: 'John Doe',
    stats: {
      posts: 42,
      followers: 1337,
      following: 100
    },
    isPremium: true
  };
}

// ✨ Extract return type automatically
type UserData = ReturnType<typeof fetchUserData>;

// 🚀 Type-safe response handling
const processUserData = (data: UserData) => {
  // TypeScript knows all properties!
  const { stats, isPremium } = data;
  console.log(
    \`User has \${stats.followers} followers
    Premium: \${isPremium}\`
  );
};`;

// Parameters Example
const parametersTypeCode = `// Parameters<Type> - Get function parameter types

// 🎯 Complex API function
function createPost(
  title: string,
  content: { text: string; media?: string[] },
  options: { draft?: boolean; tags?: string[] }
) {
  return { id: 1, title, ...content, ...options };
}

// ✨ Extract parameter types
type PostParams = Parameters<typeof createPost>;

// 🚀 Type-safe parameter handling
function validatePostParams(...args: PostParams) {
  const [title, content, options] = args;
  
  if (title.length < 5) {
    throw new Error('Title too short');
  }
  
  if (content.media?.length > 10) {
    throw new Error('Too many media items');
  }
  
  return true;
}`;

// InstanceType Example
const instanceTypeCode = `// InstanceType<Type> - Get instance type of a class

// 🎯 Complex class structure
class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    // Implementation...
    return {} as T;
  }
}

// ✨ Get instance type
type Client = InstanceType<typeof ApiClient>;

// 🚀 Type-safe mock creation
function createMockClient(): Client {
  return {
    baseUrl: 'https://api.test',
    get: async <T>(endpoint: string): Promise<T> => {
      return {} as T;
    }
  };
}

// 🔒 Type checking works!
const mock: Client = createMockClient();`;

export const UtilityTypesVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      <TransitionSeries>
        {/* Main Title */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="TypeScript Utility Types"
              subtitle="Transform Your Types Like a Pro! 🚀"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Pick Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Pick<Type, Keys>"
              subtitle="Select Only What You Need 🎯"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Pick Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={pickTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Omit Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Omit<Type, Keys>"
              subtitle="Exclude What You Don't Need 🚫"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Omit Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={omitTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Partial Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Partial<Type>"
              subtitle="Make Everything Optional ✨"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Partial Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={partialTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Required Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Required<Type>"
              subtitle="No More Optional Properties 💪"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Required Example */}
        <TransitionSeries.Sequence durationInFrames={500}>
          <CodeEditor
            initialCode={requiredTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* ReturnType Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="ReturnType<Type>"
              subtitle="Extract Function Return Types 🎯"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* ReturnType Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={returnTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Parameters Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Parameters<Type>"
              subtitle="Extract Function Parameters 🔍"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Parameters Example */}
        <TransitionSeries.Sequence durationInFrames={480}>
          <CodeEditor
            initialCode={parametersTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* InstanceType Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="InstanceType<Type>"
              subtitle="Work with Class Instances 🏭"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* InstanceType Example */}
        <TransitionSeries.Sequence durationInFrames={500}>
          <CodeEditor
            initialCode={instanceTypeCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        {/* Final Message */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Level Up Your TypeScript!"
              subtitle="Master These Types for Cleaner Code 🎯"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
