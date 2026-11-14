/// <reference types="vite/client" />

// Lets TypeScript/React understand the <model-viewer> tag from NASA's model-viewer.js
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  "auto-rotate"?: boolean | string;
  "camera-controls"?: boolean | string;
  "rotation-per-second"?: string;
  "camera-orbit"?: string;
  "shadow-intensity"?: string;
  exposure?: string;
  "interaction-prompt"?: string;
  "disable-zoom"?: boolean | string;
  loading?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}
