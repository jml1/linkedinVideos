import React from "react";
import { AbsoluteFill } from "remotion";
import { CodeEditor } from "../../components/CodeEditor";
import { Title } from "../../components/Title";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { TerminalBackground } from "../../components/TerminalBackground";

// Basic Authentication
const basicAuthCode = `// Basic Authentication Implementation
const basicAuth = async (req, res, next) => {
  // Get Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      error: 'Authorization header missing or invalid'
    });
  }

  // Decode base64 credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64')
    .toString('utf-8');
  
  const [username, password] = credentials.split(':');

  try {
    // Verify credentials against database
    const user = await User.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Usage Example
app.get('/api/protected',
  basicAuth,
  (req, res) => {
    res.json({ message: 'Welcome ' + req.user.username });
  }
);`;

// JWT Authentication
const jwtAuthCode = `// JWT Authentication Implementation
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Login and generate token
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verify user credentials
    const user = await User.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`;

// OAuth2 Authentication
const oauth2Code = `// OAuth2 Implementation with Google
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Routes setup
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);`;

// Session-based Authentication
const sessionAuthCode = `// Session-based Authentication
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Store user data in session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Middleware to check session
const checkSession = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};`;

export const AuthVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ position: "relative" }}>
      <TerminalBackground />
      <TransitionSeries>
        {/* Title */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <Title
            title="Authentication Patterns"
            subtitle="Secure your applications the right way"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Basic Auth */}
        <TransitionSeries.Sequence durationInFrames={660}>
          <CodeEditor
            initialCode={basicAuthCode}
            typingSpeed={1.2}
            showLineNumbers={true}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* JWT Auth */}
        <TransitionSeries.Sequence durationInFrames={660}>
          <CodeEditor
            initialCode={jwtAuthCode}
            typingSpeed={1.2}
            showLineNumbers={true}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* OAuth2 */}
        <TransitionSeries.Sequence durationInFrames={360}>
          <CodeEditor
            initialCode={oauth2Code}
            typingSpeed={1.2}
            showLineNumbers={true}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={springTiming({ durationInFrames: 30 })}
        />

        {/* Session Auth */}
        <TransitionSeries.Sequence durationInFrames={360}>
          <CodeEditor
            initialCode={sessionAuthCode}
            typingSpeed={1.2}
            showLineNumbers={true}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
