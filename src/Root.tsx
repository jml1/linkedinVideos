import React from "react";
import { Composition } from "remotion";
import { MapVideo } from "./MapVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MapFunction"
        component={MapVideo}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
