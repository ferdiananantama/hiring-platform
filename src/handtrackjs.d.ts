// handtrackjs.d.ts
declare module "handtrackjs" {
  export interface HandTrackModel {
    detect(video: HTMLVideoElement): Promise<any[]>;
  }

  export function load(): Promise<HandTrackModel>;
}
