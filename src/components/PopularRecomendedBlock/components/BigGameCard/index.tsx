import React from 'react';
import { CordGame } from 'types';
import { Card, Typography, Box, Button } from '@material-ui/core';
import { Rating } from 'components';

import useStyles from './useStyles';

interface Props {
  game: CordGame;
}

const BigGameCard = (props: Props) => {
  const { game } = props;
  const { title, price, discount = 0, rating } = game;
  const imageSrc = game.media.screenshots[0];
  const isGameDiscounted = discount > 0 && discount < 100;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.imageWrapper}>
        <div className={classes.rating}>
          <Rating rating={rating} />
        </div>
        <img className={classes.image} alt={title} title={title} src={imageSrc} />
      </div>
      <div className={classes.content}>
        <Box flexGrow={1} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <Box display="flex">
            {isGameDiscounted && (
              <Button variant="contained" color="primary">
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

export default BigGameCard;
