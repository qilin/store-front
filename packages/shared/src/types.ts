import { DesktopGame, WebGame } from '@qilin/shared/src/generated/types';

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
