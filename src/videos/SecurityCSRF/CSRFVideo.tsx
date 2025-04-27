import React from "react";
import { AbsoluteFill } from "remotion";
import { CodeEditor } from "../../components/CodeEditor";
import { Title } from "../../components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { ColorExplosion } from "../../components/ColorExplosion";

// Vulnerable Code Example
const vulnerableCode = `// ❌ Vulnerable Code Example
// Bank transfer endpoint without CSRF protection

app.post('/transfer', async (req, res) => {
  const { amount, toAccount } = req.body;
  
  // User is authenticated via session cookie
  const fromAccount = req.user.accountId;
  
  // DANGEROUS: No CSRF token verification
  await bankDB.transfer({
    from: fromAccount,
    to: toAccount,
    amount: amount
  });
  
  res.json({ success: true });
});

// Malicious Site HTML:
<form id="hack" action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000" />
  <input type="hidden" name="toAccount" value="HACKER" />
</form>
<script>document.getElementById("hack").submit();</script>

// When victim visits malicious site:
// 1. Form auto-submits
// 2. Browser sends cookies
// 3. Transfer succeeds 😱`;

// CSRF Token Implementation
const csrfTokenCode = `// ✅ CSRF Token Protection

// Generate and set token in session
app.use((req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto
      .randomBytes(32)
      .toString('hex');
  }
  next();
});

// Middleware to verify token
const verifyCsrf = (req, res, next) => {
  const token = req.headers['csrf-token'] ||
                req.body._csrf;
                
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({
      error: 'Invalid CSRF token'
    });
  }
  
  next();
};

// Protected endpoint
app.post('/transfer', verifyCsrf, async (req, res) => {
  // Now safe to process transfer
  const { amount, toAccount } = req.body;
  // ...
});`;

// SameSite Cookies
const sameSiteCode = `// ✅ SameSite Cookie Protection

// Express session configuration
app.use(session({
  // ... other options
  cookie: {
    sameSite: 'strict',  // Prevent cross-site cookie send
    secure: true,        // Only over HTTPS
    httpOnly: true       // No JS access
  }
}));

// Custom cookie settings
res.cookie('sessionId', 'abc123', {
  sameSite: 'strict',
  secure: true,
  httpOnly: true
});

// Modern browsers block cross-site cookies by default
// This prevents most CSRF attacks without tokens!`;

// Framework Solutions
const frameworkCode = `// ✅ Modern Framework Solutions

// React + Axios
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// Angular (Built-in Protection)
@Injectable()
export class TransferService {
  constructor(private http: HttpClient) {}
  
  transfer(amount: number, toAccount: string) {
    // Angular automatically adds XSRF token
    return this.http.post('/api/transfer', {
      amount,
      toAccount
    });
  }
}

// Express + csurf middleware
const csrf = require('csurf');
app.use(csrf());

app.get('/form', (req, res) => {
  // Pass token to view
  res.render('form', { csrfToken: req.csrfToken() });
});`;

export const CSRFVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      <TransitionSeries>
        {/* Main Title */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="Cross-Site Request Forgery"
              subtitle="Protect Your Web Apps from CSRF Attacks 🛡️"
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
              subtitle="Common CSRF Vulnerabilities ⚠️"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Vulnerable Example */}
        <TransitionSeries.Sequence durationInFrames={550}>
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

        {/* CSRF Token Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="CSRF Tokens"
              subtitle="Synchronizer Token Pattern 🔑"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* CSRF Token Example */}
        <TransitionSeries.Sequence durationInFrames={500}>
          <CodeEditor
            initialCode={csrfTokenCode}
            typingSpeed={1.6}
            showLineNumbers={true}
            theme="dark"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* SameSite Title */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <AbsoluteFill>
            <ColorExplosion />
            <Title
              title="SameSite Cookies"
              subtitle="Modern Browser Protection 🍪"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* SameSite Example */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <CodeEditor
            initialCode={sameSiteCode}
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
              subtitle="Built-in CSRF Protection ✨"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Framework Solutions Example */}
        <TransitionSeries.Sequence durationInFrames={500}>
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
              title="Secure Your Forms!"
              subtitle="Don't Let Attackers Forge Your Requests 🔒"
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
