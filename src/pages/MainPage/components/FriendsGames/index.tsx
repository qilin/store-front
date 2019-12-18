import React from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FriendGame } from 'generated/types';

import { HeaderWithMoreBtn } from '../index';
import FriendCard from './components/FriendCard';
import BlockCard from '../BlockCard';
import EmptyBlock from '../EmptyBlock';

interface Props {
  games: FriendGame[];
  openGame: (id: string) => void;
  handleMore: () => void;
}

const FriendsGames = (props: Props) => {
  const { games, openGame, handleMore } = props;
  const { t } = useTranslation();

  return (
    <div>
      <HeaderWithMoreBtn title={t('titles.friends_games')} handleMore={handleMore} />
      <Box display="flex" flexWrap="wrap">
        {games.length
          ? games.slice(0, 2).map(friendGame => {
            const { game, friends } = friendGame;
            const { id } = game;
            return <BlockCard key={id} id={id} openGame={openGame} friends={friends} Component={FriendCard} />;
          })
          : <EmptyBlock />
        }
      </Box>
    </div>
  );
};

export default FriendsGames;
