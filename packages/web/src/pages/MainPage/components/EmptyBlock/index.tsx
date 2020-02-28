import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TITLE_GREY } from 'styles/colors';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: TITLE_GREY,
  },
});

const EmptyBlock = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {t('titles.empty_block')}
      </Typography>
    </div>
  );
};

export default EmptyBlock;
