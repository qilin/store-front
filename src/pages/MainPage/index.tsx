import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { PopularRecomendedBlock, UpdatesExpansions, FriendsGames } from 'components';

import useStyles from './useStyles';
import { mockGames, mockFriendGames } from 'mocks';

const MainPage = (props: RouteComponentProps) => {
  const classes = useStyles();
  const openGame = (id: string) => props.history.push(`game?uuid=${id}`);

  return (
    <div className={classes.root}>
      <PopularRecomendedBlock
        popular={mockGames}
        recomended={mockGames}
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
              games={mockFriendGames}
              openGame={openGame}
              handleMore={() => { }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <UpdatesExpansions
              games={mockGames}
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
