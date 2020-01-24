import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { CARD_GAME } from '../../query';

const useStyle = makeStyles({
  loaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 432,
  },
});

interface Props {
  id: string;
  Component: React.ComponentType;
}

const BlockCard = (props: Props & any) => {
  const { id, Component, ...rest } = props;
  const classes = useStyle();
  const { loading, error, data } = useQuery(CARD_GAME, { variables: { id } });

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error ${error.message}</div>;

  const { game } = data.store;

  return <Component game={game} {...rest} />;
};

export default BlockCard;
