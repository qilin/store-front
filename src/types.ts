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
