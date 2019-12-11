import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getUrlParameter } from 'helpers';

import { WebGame, DesktopGame } from './components';

const GamePage = (props: RouteComponentProps) => {
  const uuid = getUrlParameter('uuid', props.location.search);
  const type = getUrlParameter('type', props.location.search);

  return (
    <>
      {type === 'desktop' && <DesktopGame />}
      {type === 'web' && <WebGame uuid={uuid} />}
    </>
  );
};

export default GamePage;
