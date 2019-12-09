import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    fontSize: '16px',
  },
  divider: {
    width: '1px',
    backgroundColor: 'white',
    margin: '0 8px',
  },
});

interface Props {
  title: string;
  realeaseDate: string;
}

const Release = (props: Props) => {
  const { title, realeaseDate } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {t('labels.released_on')}
      {' '}
      {realeaseDate}
      <div className={classes.divider} />
      {title}
    </div>
  );
};

export default Release;
