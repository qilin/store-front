/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainPageQuery
// ====================================================

export interface MainPageQuery_store_recommended_Breaker {
  __typename: "Breaker";
}

export interface MainPageQuery_store_recommended_FreeGamesGroup_games_game_media_screenshots {
  __typename: "Image";
  url: string;
}

export interface MainPageQuery_store_recommended_FreeGamesGroup_games_game_media {
  __typename: "Media";
  screenshots: MainPageQuery_store_recommended_FreeGamesGroup_games_game_media_screenshots[];
}

export interface MainPageQuery_store_recommended_FreeGamesGroup_games_game_requirements {
  __typename: "SystemRequirements";
  platform: string;
}

export interface MainPageQuery_store_recommended_FreeGamesGroup_games_game {
  __typename: "DesktopGame" | "WebGame";
  id: string;
  title: string;
  description: string;
  media: MainPageQuery_store_recommended_FreeGamesGroup_games_game_media;
  requirements: MainPageQuery_store_recommended_FreeGamesGroup_games_game_requirements[];
}

export interface MainPageQuery_store_recommended_FreeGamesGroup_games {
  __typename: "FreeGameOffer";
  game: MainPageQuery_store_recommended_FreeGamesGroup_games_game;
}

export interface MainPageQuery_store_recommended_FreeGamesGroup {
  __typename: "FreeGamesGroup";
  games: MainPageQuery_store_recommended_FreeGamesGroup_games[];
}

export type MainPageQuery_store_recommended = MainPageQuery_store_recommended_Breaker | MainPageQuery_store_recommended_FreeGamesGroup;

export interface MainPageQuery_store_popular_Breaker {
  __typename: "Breaker";
}

export interface MainPageQuery_store_popular_FreeGamesGroup_games_game_media_screenshots {
  __typename: "Image";
  url: string;
}

export interface MainPageQuery_store_popular_FreeGamesGroup_games_game_media {
  __typename: "Media";
  screenshots: MainPageQuery_store_popular_FreeGamesGroup_games_game_media_screenshots[];
}

export interface MainPageQuery_store_popular_FreeGamesGroup_games_game_requirements {
  __typename: "SystemRequirements";
  platform: string;
}

export interface MainPageQuery_store_popular_FreeGamesGroup_games_game {
  __typename: "DesktopGame" | "WebGame";
  id: string;
  title: string;
  description: string;
  media: MainPageQuery_store_popular_FreeGamesGroup_games_game_media;
  requirements: MainPageQuery_store_popular_FreeGamesGroup_games_game_requirements[];
}

export interface MainPageQuery_store_popular_FreeGamesGroup_games {
  __typename: "FreeGameOffer";
  game: MainPageQuery_store_popular_FreeGamesGroup_games_game;
}

export interface MainPageQuery_store_popular_FreeGamesGroup {
  __typename: "FreeGamesGroup";
  games: MainPageQuery_store_popular_FreeGamesGroup_games[];
}

export type MainPageQuery_store_popular = MainPageQuery_store_popular_Breaker | MainPageQuery_store_popular_FreeGamesGroup;

export interface MainPageQuery_store {
  __typename: "StoreQuery";
  recommended: MainPageQuery_store_recommended | null;
  popular: MainPageQuery_store_popular | null;
}

export interface MainPageQuery_viewer_friendsGames_game_media_screenshots {
  __typename: "Image";
  url: string;
}

export interface MainPageQuery_viewer_friendsGames_game_media {
  __typename: "Media";
  screenshots: MainPageQuery_viewer_friendsGames_game_media_screenshots[];
}

export interface MainPageQuery_viewer_friendsGames_game_requirements {
  __typename: "SystemRequirements";
  platform: string;
}

export interface MainPageQuery_viewer_friendsGames_game {
  __typename: "DesktopGame" | "WebGame";
  id: string;
  title: string;
  description: string;
  media: MainPageQuery_viewer_friendsGames_game_media;
  requirements: MainPageQuery_viewer_friendsGames_game_requirements[];
}

export interface MainPageQuery_viewer_friendsGames_friends {
  __typename: "User";
  id: number;
}

export interface MainPageQuery_viewer_friendsGames {
  __typename: "FriendGame";
  game: MainPageQuery_viewer_friendsGames_game;
  friends: MainPageQuery_viewer_friendsGames_friends[];
}

export interface MainPageQuery_viewer {
  __typename: "ViewerQuery";
  friendsGames: MainPageQuery_viewer_friendsGames[];
}

export interface MainPageQuery {
  store: MainPageQuery_store | null;
  viewer: MainPageQuery_viewer | null;
}
