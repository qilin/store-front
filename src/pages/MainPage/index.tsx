import React from 'react';
import { RouteComponentProps } from 'react-router';
import { PopularRecomendedBlock } from 'components';

import useStyles from './useStyles';

const MainPage = (props: RouteComponentProps) => {
  const classes = useStyles();
  const openGame = (id: string) => props.history.push(`game?uuid=${id}`);

  return (
    <div className={classes.root}>
      <PopularRecomendedBlock
        openGame={openGame}
        autoPlayIntervals={{
          first: 3000,
          second: 5000,
        }}
      />
    </div>
  );
};

export default MainPage;
