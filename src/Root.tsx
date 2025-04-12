import React from "react";
import { Composition } from "remotion";
import { MapVideo } from "./MapVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SuperLinkedin"
        component={MapVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
