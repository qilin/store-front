import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, makeStyles } from '@material-ui/core';

import { WebGame, DesktopGame } from './components';
import { GET_GAME } from './query';

const useStyle = makeStyles({
  loaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
});

const GamePage = () => {
  const classes = useStyle();
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_GAME, { variables: { slug } });

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error ${error.message}</div>;

  const game = data && data.store && data.store.gameBySlug;
  const { __typename: type } = game;

  return (
    <>
      {type === 'DesktopGame'
        ? <DesktopGame game={game} />
        : <WebGame game={game} />
      }
    </>
  );
};

export default GamePage;
