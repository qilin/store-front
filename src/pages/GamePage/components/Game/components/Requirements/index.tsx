import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { SystemsRequirements } from 'types';
import colors from 'styles/colors';

import Systems from '../Systems';
import Languages from '../Languages';

interface Props {
  systems: SystemsRequirements;
  languages: {
    audio: string[];
    text: string[];
  };
}

const useStyles = makeStyles({
  root: {
    padding: '35px 45px',
    backgroundColor: colors.BACKGROUND_LIGHT,
  },
  icon: {
    fontSize: '1.718em',
    fill: 'white',
  },
  title: {
    color: colors.TITLE_GREY,
    padding: '1rem',
  },
});

const Requirements = (props: Props) => {
  const { systems, languages } = props;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Typography variant="h3" className={classes.title}>
            System requirements
          </Typography>
          <Systems systems={systems} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="h3" className={classes.title}>
            Language support
          </Typography>
          <Languages languages={languages} />
        </Grid>
      </Grid>
    </section>
  );
};

export default Requirements;
