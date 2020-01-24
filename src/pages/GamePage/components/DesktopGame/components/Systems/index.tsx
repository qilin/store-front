import React from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TabPanel } from '@qilin/shared/src/components';
import { SystemRequirements, Platform, Maybe } from 'generated/types';
import getPlatformIcons from 'helpers/getPlatformIcons';

import System from '../System';
import useStyles from './useStyles';

interface Props {
  systems: SystemRequirements[];
  platforms: Maybe<Platform>[];
}

const Systems = (props: Props) => {
  const [tab, setTab] = React.useState(0);
  const { systems, platforms } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const platformIcons = getPlatformIcons(platforms);
  const osSystems = Object.values(systems).filter(Boolean);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <section className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
      >
        {platformIcons.map((Icon, index) => (
          <Tab key={index} icon={<Icon className={classes.icon} />} />
        ))}
      </Tabs>
      {osSystems.map((os: any, index) => (
        <TabPanel key={index} value={tab} index={index}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <System title={t('labels.minimal')} requirements={os.minimal} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <System title={t('labels.recommended')} requirements={os.recommended} />
            </Grid>
          </Grid>
        </TabPanel>
      ))}
    </section>
  );
};

export default Systems;
