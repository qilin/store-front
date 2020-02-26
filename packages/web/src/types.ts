import { DesktopGame, WebGame } from 'generated/types';

export type Callback = (args?: any) => void;

export interface User {
  profile: {
    firstname: string;
    lastname: string;
    phone: string;
  };
}

export type Game = DesktopGame | WebGame;

export interface GameObject {
  game: Game;
}

export interface AppInfo {
  name: string;
  version: string;
  channel: string;
  channels: string[];
}

export interface UpdateInfo {
  version: string;
  files: { url: string }[];
  releaseName: string;
  releaseNotes: string;
  releaseDate: string;
  stagingPercentage: number;
}

export interface UpdateError {
  code: string;
  stack: string;
}

export interface CheckUpdateParams {
  channel: string;
  autoDownload: boolean;
}

export interface ProgressInfo {
  bytesPerSecond: any;
  percent: any;
  total: any;
  transferred: any;
}
