import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GameCard } from 'components';
import { Game } from 'types';

import useStyles from './useStyles';
import { HeaderWithMoreBtn } from '../index';

interface Props {
  games: Game[];
  openGame: (id: string) => void;
  handleMore: () => void;
}

const UpdatesExpansions = (props: Props) => {
  const { games, openGame, handleMore } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <HeaderWithMoreBtn title={t('titles.updates_expansions')} handleMore={handleMore} />
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {games.slice(0, 4).map(game => {
          const { title, media, id } = game;
          const imageSrc = media.screenshots[0];
          const cardContent = (
            <div className={classes.imageWrapper}>
              <img className={classes.image} alt={title} title={title} src={imageSrc} />
            </div>
          );
          const footerContent = <Typography variant="subtitle1">{title}</Typography>;
          const mockLikeAndAddToCart = (id: string) => console.log(id);
          return (
            <Box key={id} className={classes.cardWrapper}>
              <GameCard
                game={game}
                openGame={openGame}
                likeGame={mockLikeAndAddToCart}
                addGameToCart={mockLikeAndAddToCart}
                cardContent={cardContent}
                footerContent={footerContent}
              />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default UpdatesExpansions;
