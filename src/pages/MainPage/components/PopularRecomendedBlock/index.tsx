import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import { Game } from 'types';

import { BigGameCard, SmallGameCard } from './components';
import useStyles from './useStyles';

interface Props {
  autoPlayIntervals?: {
    first: number;
    second: number;
  };
  popular: Game[];
  recomended: Game[];
  openGame: (id: string) => void;
}

const defaultIntervals = { first: 3000, second: 3000 };

const PopularRecomendedBlock = (props: Props) => {
  const { openGame, popular, recomended, autoPlayIntervals = defaultIntervals } = props;
  const { first, second } = autoPlayIntervals;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h5" className={classes.title}>
          {t('titles.popular_recomended')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item sm={8}>
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              interval={first}
              autoPlay
              infiniteLoop
            >
              {popular.map(game => (
                <div key={game.id} className={classes.cardWrapper}>
                  <BigGameCard game={game} openGame={openGame} />
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid item sm={4}>
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              interval={second}
              autoPlay
              infiniteLoop
            >
              {recomended.map(game => (
                <div key={game.id} className={classes.cardWrapper}>
                  <SmallGameCard game={game} openGame={openGame} />
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PopularRecomendedBlock;
