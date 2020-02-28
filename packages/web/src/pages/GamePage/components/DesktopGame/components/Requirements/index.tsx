import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SystemRequirements, Platform, Maybe, Languages as LanguagesType } from 'generated/types';

import { Systems, Languages } from '../index';
import useStyles from './useStyles';

interface Props {
  requirements: SystemRequirements[];
  platforms: Maybe<Platform>[];
  languages?: Maybe<LanguagesType>;
}

const Requirements = (props: Props) => {
  const { requirements, languages, platforms } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Typography variant="h3" className={classes.title}>
            {t('titles.system_requirements')}
          </Typography>
          <Systems platforms={platforms} systems={requirements} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="h3" className={classes.title}>
            {t('titles.language_support')}
          </Typography>
          <Languages languages={languages} />
        </Grid>
      </Grid>
    </section>
  );
};

export default Requirements;
