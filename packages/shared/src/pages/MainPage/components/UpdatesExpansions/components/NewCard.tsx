import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { GameCard } from '@qilin/shared/src/components';
import { Game } from '@qilin/shared/src/types';

import useStyles from '../useStyles';

interface Props {
  game: Game;
  openGame: (slug: string) => void;
}

const NewCard = (props: Props) => {
  const { game, openGame } = props;
  const { title, media, id } = game;
  const classes = useStyles();
  const imageSrc = media.screenshots[0].url;
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
};

export default NewCard;
