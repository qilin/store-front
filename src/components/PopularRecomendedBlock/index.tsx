import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import { CordGame } from 'types';
import cordGameMock from 'pages/GamePage/cordGameMock';

import BigGameCard from './components/BigGameCard';
import useStyles from './useStyles';
// import './index.css';

interface Props {
  popular?: CordGame[];
  recomended?: CordGame[];
}

const mockGames = [cordGameMock, cordGameMock, cordGameMock];

const PopularRecomendedBlock = (props: Props) => {
  const { popular = mockGames, recomended = mockGames } = props;
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
            <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop>
              {popular.map((game, index) => (
                <div key={index} className={classes.cardWrapper}>
                  <BigGameCard game={game} />
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid item sm={4}>
            <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop>
              {recomended.map((_, index) => (
                <div key={index} className={classes.cardWrapper}><div className={classes.green} /></div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PopularRecomendedBlock;
