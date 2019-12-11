import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import useStyles from './useStyles';

interface Props {
  screenshots: string[];
  trailers: string[];
}

const Media = (props: Props) => {
  const { screenshots, trailers } = props;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Grid container spacing={3}>
        {trailers.map(trailer => (
          <Grid item xs={12} sm={6} md={3} key={trailer}>
            <Paper className={classes.cardContent}>
              <video width="100%" height="100%" controls src={trailer} />
            </Paper>
          </Grid>
        ))}
        {screenshots.map(screenshot => (
          <Grid item xs={12} sm={6} md={3} key={screenshot}>
            <Paper className={classes.cardContent}>
              <img width="100%" height="100%" src={screenshot} alt="game-screenshot" />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Media;
