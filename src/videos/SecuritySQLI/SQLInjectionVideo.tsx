import React from "react";
import { AbsoluteFill } from "remotion";
import { CodeEditor } from "../../components/CodeEditor";
import { Title } from "../../components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ColorExplosion } from "../../components/ColorExplosion";

// Introduction Example
const introCode = `// 🔍 Understanding SQL Injection
// Let's see how attackers can manipulate SQL queries

// Consider this login form:
<form action="/login" method="POST">
  <input name="username" placeholder="Username" />
  <input name="password" type="password" />
  <button type="submit">Login</button>
</form>

// Backend code handling the login:
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // ❌ VULNERABLE QUERY
  const query = \`
    SELECT * FROM users 
    WHERE username = '\${username}' 
    AND password = '\${password}'
  \`;
  
  const user = await db.query(query);
  // ... handle login
});

// 😱 Attacker input:
// username: admin' --
// password: anything

// Resulting query:
// SELECT * FROM users WHERE username = 'admin' -- ' AND password = 'anything'
// The -- makes the rest a comment!`;

// Real World Attack Scenarios
const attackScenariosCode = `// 🎯 Common SQL Injection Attack Patterns

// 1. Union-Based Attacks
// Attacker input:
const maliciousInput = "' UNION SELECT 
  creditcard_number,
  cvv,
  expiry_date 
FROM payment_details; --";

// 2. Time-Based Blind Injection
const blindAttack = "' AND (
  SELECT CASE WHEN 
    (username = 'admin') 
  THEN pg_sleep(10) 
  ELSE pg_sleep(0) 
  END 
FROM users
) --";

// 3. Error-Based Injection
const errorAttack = "' AND 
  CAST((SELECT TOP 1 password FROM users) AS INT) --";

// 4. Stacked Queries
const stackedQuery = "'; 
  DROP TABLE users; 
  SELECT * FROM accounts WHERE 't' = 't";

// Each of these attacks can:
// - Steal sensitive data
// - Modify database content
// - Delete entire tables
// - Execute admin commands`;

// Prevention Methods
const preventionCode = `// ✅ SQL Injection Prevention Best Practices

// 1. Use Parameterized Queries
const safeQuery = {
  text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
  values: [username, password]
};

await client.query(safeQuery);

// 2. ORM Usage (Sequelize Example)
const user = await User.findOne({
  where: {
    username: username,
    password: hashedPassword
  }
});

// 3. Input Validation
const validateInput = (input) => {
  if (!/^[a-zA-Z0-9_]+$/.test(input)) {
    throw new Error('Invalid characters detected');
  }
  return input;
};

// 4. Escape Special Characters
const escapedInput = mysql.escape(userInput);

// 5. Principle of Least Privilege
await pool.connect({
  user: 'app_readonly',
  password: process.env.DB_PASSWORD,
  database: 'myapp',
  // Restricted permissions
  allowedCommands: ['SELECT']
});`;

// Modern Solutions
const modernSolutionsCode = `// 🚀 Modern Security Solutions

// 1. TypeORM with Query Builder
const users = await dataSource
  .createQueryBuilder()
  .select("user")
  .from(User, "user")
  .where("user.username = :username", { username })
  .andWhere("user.status = :status", { status: "active" })
  .getMany();

// 2. Prisma with Type Safety
const user = await prisma.user.findUnique({
  where: {
    username_email: {
      username,
      email
    }
  },
  select: {
    id: true,
    profile: true,
    settings: true
  }
});

// 3. Database Proxy with Query Analysis
app.use(dbProxy({
  analyze: true,
  blockPatterns: [
    'UNION SELECT',
    'DROP TABLE',
    '--',
    ';'
  ],
  logging: {
    suspicious: true,
    blocked: true
  }
}));

// 4. Real-time Monitoring
const monitor = new SQLMonitor({
  patterns: sqlInjectionPatterns,
  callback: async (attack) => {
    await notify({
      type: 'SQLI_ATTEMPT',
      source: attack.ip,
      query: attack.query,
      timestamp: new Date()
    });
  }
});`;

export const SQLInjectionVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      <TransitionSeries>
        {/* Main Title - 180 frames (6s) */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="SQL Injection Attacks"
              subtitle="Understanding and Preventing Database Vulnerabilities 🛡️"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 45 })}
        />

        {/* Intro - 600 frames (20s) */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <CodeEditor
            initialCode={introCode}
            typingSpeed={1.6} // Slower typing
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 45 })}
        />

        {/* Attack Scenarios - 600 frames (20s) */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <CodeEditor
            initialCode={attackScenariosCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 45 })}
        />

        {/* Prevention - 600 frames (20s) */}
        <TransitionSeries.Sequence durationInFrames={600}>
          <CodeEditor
            initialCode={preventionCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 45 })}
        />

        {/* Modern Solutions - 540 frames (18s) */}
        <TransitionSeries.Sequence durationInFrames={640}>
          <CodeEditor
            initialCode={modernSolutionsCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        {/* Final Message - 90 frames (3s) */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Protect Your Data!"
              subtitle="Always Validate and Sanitize Input 🔒"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
