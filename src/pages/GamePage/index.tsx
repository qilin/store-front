import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getUrlParameter } from 'helpers';
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

const GamePage = (props: RouteComponentProps) => {
  const classes = useStyle();
  const uuid = getUrlParameter('uuid', props.location.search);
  const { loading, error, data } = useQuery(GET_GAME, { variables: { id: uuid } });

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error ${error.message}</div>;

  const { game } = data.store;
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
