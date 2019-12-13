import React from 'react';
import { Game } from 'types';
import { Typography, Box } from '@material-ui/core';
import { Rating, PlatformIcons, GameCard } from 'components';

import useStyles from './useStyles';

interface Props {
  game: Game;
  openGame: (id: string) => void;
}

const SmallGameCard = (props: Props) => {
  const { game } = props;
  const { title, rating, description, platforms } = game;
  const imageSrc = game.media.screenshots[0].url;
  const classes = useStyles();

  const cardContent = (
    <>
      <div className={classes.rating}>
        <Rating rating={rating} />
      </div>
      <div className={classes.imageWrapper}>
        <img className={classes.image} alt={title} title={title} src={imageSrc} />
      </div>
      <Box className={classes.content}>
        <Typography variant="h6">{title}</Typography>
        <Typography className={classes.subtitle} variant="subtitle2">{description}</Typography>
      </Box>
    </>
  );

  const footerContent = <PlatformIcons platforms={platforms} wrapperClass={classes.iconWrapper} />;
  const mockLikeAndAddToCart = (id: string) => console.log(id);

  return (
    <div className={classes.root}>
      <GameCard
        footerContent={footerContent}
        cardContent={cardContent}
        likeGame={mockLikeAndAddToCart}
        addGameToCart={mockLikeAndAddToCart}
        {...props}
      />
    </div>
  );
};

export default SmallGameCard;
