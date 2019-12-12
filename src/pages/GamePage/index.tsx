import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getUrlParameter } from 'helpers';
import { useQuery } from '@apollo/react-hooks';

import { WebGame, DesktopGame } from './components';
import { GET_GAME } from './query';

const GamePage = (props: RouteComponentProps) => {
  const uuid = getUrlParameter('uuid', props.location.search);
  const { loading, error, data } = useQuery(GET_GAME, { variables: { id: uuid } });

  if (loading) return null;
  if (error) return <div>Error ${error.message}</div>;

  const { game } = data.store;
  const { __typename: type } = game;

  return (
    <>
      {type === 'DesktopGame' && <DesktopGame game={game} />}
      {type === 'WebGame' && <WebGame game={game} />}
    </>
  );
};

export default GamePage;
