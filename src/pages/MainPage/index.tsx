import React from 'react';
import FeaturedBlock from 'components/FeaturedBlock';
import PopularRecomendedBlock from 'components/PopularRecomendedBlock';

import useStyles from './useStyles';

const MainPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PopularRecomendedBlock />
      {/* <FeaturedBlock /> */}
    </div>
  );
};

export default MainPage;
