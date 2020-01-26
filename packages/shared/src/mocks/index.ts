import { Genre } from 'generated/types';

/* eslint-disable max-len */

const MOCK_GAMES_COUNT = 6;
export const getRandomId = () => Math.round((Math.random() * 1e8)).toString(16);

export const mockFriend = {
  display: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    display_name: 'Антонио Бандерос',
    avatar: {
      url: 'https://via.placeholder.com/60.png/09f/fff',
    },
  },
  info: {
    email: '',
  },
  profile: {
    gender: '',
    firstname: '',
    lastname: '',
  },
};

export const mockGame = {
  id: getRandomId(),
  description: 'Place for additional text for terms, Additional text might be even here.',
  developer: { title: 'CD PROJECT RED', id: getRandomId() },
  genres: [Genre.Rpg, Genre.FindItems, Genre.Farm],
  media: {
    screenshots: [
      {
        url: 'https://static.protocol.one/qilin/images/ss_849ec8dcc6f8df1c0b2c509584c9fc9e51f88cfa.1920x1080-d2650.jpg',
      },
      {
        url: 'https://static.protocol.one/qilin/images/ss_849ec8dcc6f8df1c0b2c509584c9fc9e51f88cfa.1920x1080-d2650.jpg',
      },
      {
        url: 'https://static.protocol.one/qilin/images/ss_849ec8dcc6f8df1c0b2c509584c9fc9e51f88cfa.1920x1080-d2650.jpg',
      },
    ],
    trailers: [
      'https://static.protocol.one/qilin/videos/y2mate.com - a_night_to_remember_launch_cinematic_the_witcher_iii_wild_hunt_ehjJ614QfeM_1080p-hQEREg.mp4',
      'https://static.protocol.one/qilin/videos/y2mate.com - the_witcher_3_wild_hunt_killing_monsters_cinematic_trailer_c0i88t0Kacs_1080p-EGtiDd.mp4',
    ],
  },
  name: 'The Witcher III',
  summary: 'summary',
  platforms: ['linux', 'windows', 'mac_os'],
  preview: '',
  price: 200,
  discount: 50,
  publisher: { title: 'CD PROJECT RED', id: getRandomId() },
  rating: 4,
  releaseDate: '2016-09-13T11:16:03Z',
  requirements: {
    languages: {
      audio: ['ru', 'de', 'en'],
      text: ['ru', 'fr', 'de', 'en', 'es', 'pt'],
    },
    systems: {
      linux: {
        minimal: {
          cpu: 'Intel / AMD 2x at 2.8 ГГц',
          diskSpace: '10240 ',
          gpu: 'nVidia GeForce 8600/9600GT, ATI/AMD Radeon HD2600/3600',
          os: 'Ubuntu 16.10',
          ram: '1024',
        },
        recommended: {
          cpu: 'Intel / AMD 2x at 2.8 ГГц',
          diskSpace: '10240 ',
          gpu: 'nVidia GeForce 8600/9600GT, ATI/AMD Radeon HD2600/3600',
          os: 'Ubuntu 18.10',
          ram: '2048 ',
        },
      },
      macos: {
        minimal: {
          cpu: 'Intel / AMD 2x at 2.8 ГГц',
          diskSpace: '102400 ',
          gpu: 'Intel / AMD 2x at 2.8 ГГц',
          os: 'MacOS 10.14',
          ram: '4096 ',
        },
        recommended: {
          cpu: 'Intel / AMD 2x at 2.8 ГГц',
          diskSpace: '102400 ',
          gpu: 'Intel / AMD 2x at 2.8 ГГц',
          os: 'MacOS 10.14',
          ram: '16384 ',
        },
      },
      windows: {
        minimal: {
          cpu: 'Intel / AMD 2x at 2.8 ГГц',
          diskSpace: '15360 ',
          gpu: 'nVidia GeForce 8600/9600GT, ATI/AMD Radeon HD2600/3600',
          os: 'Windows 8',
          ram: '4096 ',
        },
        recommended: {
          cpu: 'Intel Dual Core 2.26 GHz / AMD Athlon',
          diskSpace: '15360 ',
          gpu: 'Nvidia GeForce 8800 GT или ATI Radeon 3870 HD 512Мб',
          os: 'Windows 10',
          ram: '4096 ',
        },
      },
    },
  },
  tags: [
    { id: getRandomId(), title: 'tag' },
  ],
  title: 'The Witcher III',
};

export const mockGames = Array(MOCK_GAMES_COUNT)
  .fill(mockGame)
  .map(game => ({
    ...game,
    id: getRandomId(),
  }));

export const mockFriendGame = {
  game: mockGame,
  friend: mockFriend,
  likes: 3,
};

export const mockFriendGames = Array(MOCK_GAMES_COUNT)
  .fill(mockFriendGame)
  .map(friendGame => ({
    ...friendGame,
    game: {
      ...friendGame.game,
      id: getRandomId(),
    },
    likes: Math.round(Math.random() * 10),
  }));
