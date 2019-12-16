/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Genre } from "./globalTypes";

// ====================================================
// GraphQL query operation: Game
// ====================================================

export interface Game_store_game_media_screenshots {
  __typename: "Image";
  url: string;
}

export interface Game_store_game_media_trailers {
  __typename: "Video";
  url: string;
}

export interface Game_store_game_media {
  __typename: "Media";
  screenshots: Game_store_game_media_screenshots[];
  trailers: Game_store_game_media_trailers[];
}

export interface Game_store_game_languages {
  __typename: "Languages";
  audio: string[];
  text: string[];
}

export interface Game_store_game {
  __typename: "DesktopGame" | "WebGame";
  id: string;
  title: string;
  genres: Genre[];
  description: string;
  summary: string;
  developer: string;
  publisher: string;
  releaseDate: string | null;
  media: Game_store_game_media;
  languages: Game_store_game_languages | null;
}

export interface Game_store {
  __typename: "StoreQuery";
  game: Game_store_game | null;
}

export interface Game {
  store: Game_store | null;
}

export interface GameVariables {
  id: string;
}
