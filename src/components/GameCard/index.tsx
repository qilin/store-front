import React, { ReactNode } from 'react';
import { Card, Typography, Box, Button } from '@material-ui/core';
import { CordGame } from 'types';

import useStyles from './useStyles';

interface Props {
  game: CordGame;
  footerContent: ReactNode;
  cardContent: ReactNode;
  openGame: (id: string) => void;
}

const GameCard = (props: Props) => {
  const { game, openGame, footerContent, cardContent } = props;
  const { price, discount = 0, id } = game;
  const isGameDiscounted = discount > 0 && discount < 100;
  const handleOpen = () => openGame(id);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {cardContent}
      <div className={classes.footer}>
        <Box flexGrow={1} display="flex" justifyContent="space-between" alignItems="center">
          {footerContent}
          <Box display="flex">
            {isGameDiscounted && (
              <Button onClick={handleOpen} variant="contained" color="primary">
                {`- ${discount}%`}
              </Button>
            )}
            <Box textAlign="end" className={classes.prices}>
              {isGameDiscounted && <Typography className={classes.priceSmall}>$ {price}</Typography>}
              <Typography className={classes.priceBig}>
                $ {isGameDiscounted ? (price * discount / 100).toFixed(0) : price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </Card>
  );
};

export default GameCard;
