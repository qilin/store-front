import React from 'react';
import { RouteComponentProps } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';

const GamePage = (props: RouteComponentProps) => {
  const { uuid } = queryString.parse(props.location.search);
  console.log(uuid);

  return (
    <div>
      Game
    </div>
  );
};

export default GamePage;
