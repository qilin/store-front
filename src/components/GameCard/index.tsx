import React, { ReactNode, SyntheticEvent } from 'react';
import { Card, Typography, Box, Button, IconButton } from '@material-ui/core';
import { Game } from 'types';
import { HeartIcon, AddToCartIcon } from 'assets/icons';

import useStyles from './useStyles';

interface Props {
  game: Game;
  footerContent: ReactNode;
  cardContent: ReactNode;
  likeGame?: (id: string) => void;
  addGameToCart?: (id: string) => void;
  openGame: (id: string) => void;
}

const GameCard = (props: Props) => {
  const { game, openGame, footerContent, cardContent, likeGame, addGameToCart } = props;
  const { price, discount = 0, id } = game;
  const isGameDiscounted = discount > 0 && discount < 100;
  const handleOpen = () => openGame(id);
  const handleLike = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (typeof likeGame === 'function') likeGame(id);
  };
  const handleAddToCart = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (typeof addGameToCart === 'function') addGameToCart(id);
  };

  const classes = useStyles();

  return (
    <Card onClick={handleOpen} className={classes.root}>
      {cardContent}
      <div className={classes.footer}>
        <Box flexGrow={1} display="flex" justifyContent="space-between" alignItems="center">
          {footerContent}
          <Box display="flex" className={classes.footerLeft}>
            {isGameDiscounted && (
              <Button variant="contained" color="primary">
                {`-\u00A0${discount}%`}
              </Button>
            )}
            <Box textAlign="end" className={classes.prices}>
              {isGameDiscounted && <Typography className={classes.priceSmall}>{'$\u00A0'}{price}</Typography>}
              <Typography className={classes.priceBig}>
                {'$\u00A0'}{isGameDiscounted ? (price * discount / 100).toFixed(0) : price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
      <div className={classes.hoverContent}>
        {!!likeGame && (
          <IconButton onClick={handleLike}>
            <HeartIcon />
          </IconButton>
        )}
        {!!addGameToCart && (
          <IconButton onClick={handleAddToCart}>
            <AddToCartIcon />
          </IconButton>
        )}
      </div>
    </Card>
  );
};

export default GameCard;
