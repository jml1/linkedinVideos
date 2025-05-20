import React from "react";
import { Composition } from "remotion";
import { MapVideo } from "./MapVideo";
import { AuthVideo } from "./videos/AuthPatterns/AuthVideo";
import { PromiseVideo } from "./videos/Promises/PromiseVideo";
import { UtilityTypesVideo } from "./videos/UtilityTypes/UtilityTypesVideo";
import { XSSVideo } from "./videos/SecurityXSS/XSSVideo";
import { CSRFVideo } from "./videos/SecurityCSRF/CSRFVideo";
import { SQLInjectionVideo } from "./videos/SecuritySQLI/SQLInjectionVideo";
import { TailwindTipsVideo } from "./videos/Shorts/TailwindTipsVideo";
import { TailwindBasicsVideo } from "./videos/Shorts/TailwindBasicsVideo";
import { TestingDebateVideo } from "./videos/Shorts/TestingDebateVideo";
import { TypeScriptDebateVideo } from "./videos/Shorts/TypeScriptDebateVideo";
import { AICodingDebateVideo } from "./videos/Shorts/AICodingDebateVideo";
import { ClosuresExplainedVideo } from "./videos/Shorts/ClosuresExplainedVideo";
import { FrameworkStatsVideo } from "./videos/Shorts/FrameworkStatsVideo";
import { PythagoreanVideo } from "./videos/Math/PythagoreanVideo";
import { ReactOptimizationVideo } from "./videos/Shorts/ReactOptimizationVideo";
import { GreenCodeVideo } from "./videos/Shorts/GreenCodeVideo";
import { AIStatsVideo } from "./videos/Shorts/AIStatsVideo";
import { LinkedInGrowthVideo } from "./videos/LinkedInGrowthVideo";
import { TechPuzzleVideo } from "./videos/TechPuzzleVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* <Composition
        id="SuperLinkedin"
        component={MapVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />*/}
      {/* <Composition
        id="AuthPatterns"
        component={AuthVideo}
        durationInFrames={4650}
        fps={30}
        width={1080}
        height={1920}
      /> */}
      {/* <Composition
        id="Promises"
        component={PromiseVideo}
        durationInFrames={2250}
        fps={30}
        width={1080}
        height={1920}
      /> */}
      {/* <Composition
        id="UtilityTypes"
        component={UtilityTypesVideo}
        durationInFrames={3740}
        fps={30}
        width={1080}
        height={1920}
      /> */}
      {/* <Composition
        id="XSS"
        component={XSSVideo}
        durationInFrames={2200}
        fps={30}
        width={1080}
        height={1920}
      /> */}
      {/* <Composition
        id="CSRF"
        component={SQLInjectionVideo}
        durationInFrames={2500}
        fps={30}
        width={1080}
        height={1920}
      /> */}

      <Composition
        id="TechPuzzle"
        component={TechPuzzleVideo}
        durationInFrames={780}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
