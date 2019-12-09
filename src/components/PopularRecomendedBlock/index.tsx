import React from 'react';
import useStyles from './useStyles';
import { Container, Grid } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';

import './index.css';

interface Props {
  games?: any;
}

const PopularRecomendedBlock = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item sm={8}>
            <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop>
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className={classes.cardWrapper}><div className={classes.red} /></div>
              ))}
            </Carousel>
          </Grid>
          <Grid item sm={4}>
            <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop>
              {[1, 2, 3, 4].map((_, index) => (
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
