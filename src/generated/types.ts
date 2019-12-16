/* eslint-disable max-len */
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601DateTime: any;
};

export enum AuthenticatedRequestStatus {
  Ok = 'OK',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  BadRequest = 'BAD_REQUEST',
  ServerInternalError = 'SERVER_INTERNAL_ERROR'
}

export type AuthMutation = {
  __typename?: 'AuthMutation';
  signup: SignupOut;
};

export type AuthMutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  signin: SigninOut;
  me: User;
  signout: SignoutOut;
};

export type AuthQuerySigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Breaker = Module & {
  __typename?: 'Breaker';
  type: ModuleType;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  link: Scalars['String'];
  image?: Maybe<Image>;
  backgound?: Maybe<Scalars['String']>;
};

export type CursorIn = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  cursor: Scalars['String'];
};

export type CursorOut = {
  __typename?: 'CursorOut';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  isEnd: Scalars['Boolean'];
  cursor: Scalars['String'];
};

export type DesktopGame = Game & {
  __typename?: 'DesktopGame';
  id: Scalars['ID'];
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  developer: Scalars['String'];
  publisher: Scalars['String'];
  genres: Array<Genre>;
  releaseDate?: Maybe<Scalars['String']>;
  media: Media;
  tags: Array<Tag>;
  requirements: Array<SystemRequirements>;
  languages?: Maybe<Languages>;
};

export type FreeGameOffer = {
  __typename?: 'FreeGameOffer';
  game: Game;
  image?: Maybe<Image>;
};

export type FreeGamesGroup = Module & {
  __typename?: 'FreeGamesGroup';
  type: ModuleType;
  title: Scalars['String'];
  games: Array<FreeGameOffer>;
};

export type FriendGame = {
  __typename?: 'FriendGame';
  game: Game;
  friends: Array<User>;
};

export type Game = {
  id: Scalars['ID'];
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  developer: Scalars['String'];
  publisher: Scalars['String'];
  genres: Array<Genre>;
  releaseDate?: Maybe<Scalars['String']>;
  media: Media;
  tags: Array<Tag>;
  requirements: Array<SystemRequirements>;
  languages?: Maybe<Languages>;
};

export enum Genre {
  Board = 'Board',
  Cards = 'Cards',
  Casino = 'Casino',
  Farm = 'Farm',
  Racing = 'Racing',
  Shooter = 'Shooter',
  FindItems = 'FindItems',
  Puzzle = 'Puzzle',
  Rpg = 'RPG',
  Simulator = 'Simulator',
  Strategy = 'Strategy'
}

export type Image = {
  __typename?: 'Image';
  url: Scalars['String'];
};

export type Languages = {
  __typename?: 'Languages';
  audio: Array<Scalars['String']>;
  text: Array<Scalars['String']>;
};

export type Media = {
  __typename?: 'Media';
  screenshots: Array<Image>;
  trailers: Array<Video>;
};

export type Module = {
  type: ModuleType;
  title: Scalars['String'];
};

export enum ModuleType {
  Breaker = 'Breaker',
  FreeGamesGroup = 'FreeGamesGroup'
}

export type Mutation = {
  __typename?: 'Mutation';
  auth?: Maybe<AuthMutation>;
};

export enum OrderIn {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<AuthQuery>;
  store?: Maybe<StoreQuery>;
  viewer?: Maybe<ViewerQuery>;
};

export type RequirementsSet = {
  __typename?: 'RequirementsSet';
  cpu?: Maybe<Scalars['String']>;
  diskSpace?: Maybe<Scalars['String']>;
  gpu?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  ram?: Maybe<Scalars['String']>;
};

export enum RoleEnum {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SigninOut = {
  __typename?: 'SigninOut';
  status: SigninOutStatus;
  token: Scalars['String'];
};

export enum SigninOutStatus {
  Ok = 'OK',
  BadRequest = 'BAD_REQUEST',
  ServerInternalError = 'SERVER_INTERNAL_ERROR'
}

export type SignoutOut = {
  __typename?: 'SignoutOut';
  status: AuthenticatedRequestStatus;
};

export type SignupOut = {
  __typename?: 'SignupOut';
  status: SignupOutStatus;
};

export enum SignupOutStatus {
  Ok = 'OK',
  BadRequest = 'BAD_REQUEST',
  ServerInternalError = 'SERVER_INTERNAL_ERROR',
  UserExists = 'USER_EXISTS'
}

export type StoreFront = {
  __typename?: 'StoreFront';
  modules: Array<Module>;
};

export type StoreQuery = {
  __typename?: 'StoreQuery';
  game?: Maybe<Game>;
  games: Array<Game>;
  module?: Maybe<Module>;
  storeFront?: Maybe<StoreFront>;
};

export type StoreQueryGameArgs = {
  id: Scalars['ID'];
};

export type StoreQueryGamesArgs = {
  genre?: Maybe<Genre>;
};

export type StoreQueryModuleArgs = {
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
};

export type StoreQueryStoreFrontArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type SystemRequirements = {
  __typename?: 'SystemRequirements';
  platform: Scalars['String'];
  minimal?: Maybe<RequirementsSet>;
  recommended?: Maybe<RequirementsSet>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  type: TagType;
};

export enum TagType {
  Genre = 'genre',
  Common = 'common'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
};

export type Video = {
  __typename?: 'Video';
  url: Scalars['String'];
};

export type ViewerQuery = {
  __typename?: 'ViewerQuery';
  games: Array<Game>;
  friendsGames: Array<FriendGame>;
};

export type WebGame = Game & {
  __typename?: 'WebGame';
  id: Scalars['ID'];
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  developer: Scalars['String'];
  publisher: Scalars['String'];
  genres: Array<Genre>;
  releaseDate?: Maybe<Scalars['String']>;
  media: Media;
  tags: Array<Tag>;
  requirements: Array<SystemRequirements>;
  languages?: Maybe<Languages>;
};

export type GameQueryVariables = {
  id: Scalars['ID'];
};

export type GameQuery = (
  { __typename?: 'Query' }
  & {
    store: Maybe<(
      { __typename?: 'StoreQuery' }
      & {
        game: Maybe<(
          { __typename?: 'DesktopGame' }
          & Pick<DesktopGame, 'id' | 'title' | 'genres' | 'description' | 'summary' | 'developer' | 'publisher' | 'releaseDate'>
          & {
            media: (
              { __typename?: 'Media' }
              & {
                screenshots: Array<(
                  { __typename?: 'Image' }
                  & Pick<Image, 'url'>
                )>; trailers: Array<(
                  { __typename?: 'Video' }
                  & Pick<Video, 'url'>
                )>;
              }
            ); languages: Maybe<(
              { __typename?: 'Languages' }
              & Pick<Languages, 'audio' | 'text'>
            )>;
          }
        ) | (
            { __typename?: 'WebGame' }
            & Pick<WebGame, 'id' | 'title' | 'genres' | 'description' | 'summary' | 'developer' | 'publisher' | 'releaseDate'>
            & {
              media: (
                { __typename?: 'Media' }
                & {
                  screenshots: Array<(
                    { __typename?: 'Image' }
                    & Pick<Image, 'url'>
                  )>; trailers: Array<(
                    { __typename?: 'Video' }
                    & Pick<Video, 'url'>
                  )>;
                }
              ); languages: Maybe<(
                { __typename?: 'Languages' }
                & Pick<Languages, 'audio' | 'text'>
              )>;
            }
          )>;
      }
    )>;
  }
);
