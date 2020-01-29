import { DesktopGame, WebGame } from 'generated/types';

export type Callback = (args?: any) => void;

export interface User {
  profile: {
    gender?: string;
    firstname: string;
    lastname: string;
    phone: string;
  };
}

export type Game = DesktopGame | WebGame;

export interface GameObject {
  game: Game;
}
