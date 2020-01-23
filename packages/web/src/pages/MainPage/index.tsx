import React from 'react';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import { PopularRecomendedBlock, UpdatesExpansions, FriendsGames } from './components';
import useStyles from './useStyles';
import { MAIN_PAGE } from './query';

const MainPage = (props: RouteComponentProps) => {
  const classes = useStyles();
  const openGame = (slug: string) => props.history.push(`game/${slug}`);
  const { loading, error, data } = useQuery(MAIN_PAGE);

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error ${error.message}</div>;

  const popularGames = (data && data.store && data.store.popular && data.store.popular.games) || [];
  const recomendedGames = (data && data.store && data.store.recommended && data.store.recommended.games) || [];
  const newGames = (data && data.store && data.store.recommended && data.store.recommended.games) || [];
  const friendGames = (data && data.viewer && data.viewer.friendGames) || [];

  return (
    <div className={classes.root}>
      <PopularRecomendedBlock
        popular={popularGames}
        recomended={recomendedGames}
        openGame={openGame}
        autoPlayIntervals={{
          first: 3000,
          second: 5000,
        }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <FriendsGames
              games={friendGames}
              openGame={openGame}
              handleMore={() => { }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <UpdatesExpansions
              games={newGames}
              openGame={openGame}
              handleMore={() => { }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainPage;
