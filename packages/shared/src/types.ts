import { DesktopGame, WebGame } from 'generated/types';

export type Callback = (args?: any) => void;

export interface User {
  display: {
    display_name: string;
    avatar: {
      url: string;
    };
  };
  info: {
    email: string;
  };
  profile: {
    gender: string;
    firstname: string;
    lastname: string;
  };
}

export type Game = DesktopGame | WebGame;

export interface GameObject {
  game: Game;
}
