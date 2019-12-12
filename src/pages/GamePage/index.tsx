import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getUrlParameter } from 'helpers';
import { useQuery } from '@apollo/react-hooks';

import { WebGame, DesktopGame } from './components';
import { GET_GAME } from './query';

const GamePage = (props: RouteComponentProps) => {
  const uuid = getUrlParameter('uuid', props.location.search);
  const type = getUrlParameter('type', props.location.search);
  const { loading, error, data } = useQuery(GET_GAME);

  console.log(data);

  return (
    <>
      {type === 'desktop' && <DesktopGame />}
      {type === 'web' && <WebGame uuid={uuid} />}
    </>
  );
};

export default GamePage;
