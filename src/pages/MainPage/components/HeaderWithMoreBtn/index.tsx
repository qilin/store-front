import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TITLE_GREY, BLACK } from 'styles/colors';

const useStyles = makeStyles({
  title: {
    color: TITLE_GREY,
  },
  button: {
    backgroundColor: BLACK,
    color: 'white',
  },
});

interface Props {
  title: string;
  handleMore: () => void;
}

const HeaderWithMoreBtn = (props: Props) => {
  const { title, handleMore } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box padding="1.5rem 0" display="flex" justifyContent="space-between">
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Button className={classes.button} onClick={handleMore} size="small">
        {t('labels.more_btn')}
      </Button>
    </Box>
  );
};

export default HeaderWithMoreBtn;
