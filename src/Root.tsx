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
        id="TailwindBasics"
        component={TailwindBasicsVideo}
        durationInFrames={670}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
