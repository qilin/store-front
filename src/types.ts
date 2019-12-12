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

export interface GameTag {
  id: number;
  name: string;
  slug: string;
  type: string;
}

export interface Screenshot {
  url: string;
}

export interface Game {
  id: number;
  title: string;
  slug: string;
  summary: string;
  rating: number;
  has_promo: boolean;
  supports_mobile: boolean;
  description: string;
  type: string;
  engine: string;
  frame_width: number;
  frame_height: number;
  user_warning_message: string | null;
  promo: string;
  publisher: string;
  tags: GameTag[];
  badge: any;
  screenshots: Screenshot[];
  covers: any;
  metadata: any;
  related: {
    items: Game[];
  };
}

export interface WithTitleAndId {
  title: string;
  id: string;
}

export interface Requirements {
  cpu: string;
  diskSpace: string;
  gpu: string;
  os: string;
  ram: string;
}

export interface RequirementsOS {
  minimal: Requirements;
  recommended: Requirements;
}

export interface SystemsRequirements {
  linux?: RequirementsOS;
  macos?: RequirementsOS;
  windows?: RequirementsOS;
}

export interface CordGame {
  id: string;
  description: string;
  developer: WithTitleAndId;
  genres: WithTitleAndId[];
  media: {
    screenshots: string[];
    trailers: string[];
  };
  name: string;
  platforms: string[];
  preview: string;
  price: number;
  discount?: number;
  publisher: WithTitleAndId;
  rating: number;
  releaseDate: string;
  requirements: {
    languages: {
      audio: string[];
      text: string[];
    };
    systems: SystemsRequirements;
  };
  tags: WithTitleAndId[];
  title: string;
}

export interface FriendGame {
  game: CordGame;
  friend: User;
  likes: number;
}
