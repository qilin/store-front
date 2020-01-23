import React from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GameObject } from 'types';

import { HeaderWithMoreBtn } from '../index';
import BlockCard from '../BlockCard';
import NewCard from './components/NewCard';
import EmptyBlock from '../EmptyBlock';

interface Props {
  games: GameObject[];
  openGame: (slug: string) => void;
  handleMore: () => void;
}

const UpdatesExpansions = (props: Props) => {
  const { games, openGame, handleMore } = props;
  const { t } = useTranslation();

  return (
    <div>
      <HeaderWithMoreBtn title={t('titles.updates_expansions')} handleMore={handleMore} />
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {games.length
          ? games.slice(0, 4).map(({ game }) => (
            <BlockCard key={game.id} Component={NewCard} id={game.id} openGame={openGame} />
          ))
          : <EmptyBlock />
        }
      </Box>
    </div>
  );
};

export default UpdatesExpansions;
