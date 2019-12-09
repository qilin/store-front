import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import colors from 'styles/colors';

const useStyles = makeStyles({
  root: {
    padding: '35px 45px',
    backgroundColor: colors.BACKGROUND_LIGHT,
  },
  cardContent: {
    width: '100%',
    height: '150px',
    borderRadius: '4px',
    backgroundColor: 'black',
    overflow: 'hidden',
  },
});

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
              <img width="100%" height="100%" src={screenshot} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Media;
