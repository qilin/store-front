import React from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TabPanel from 'components/TabPanel';
import { WindowsIcon, AppleIcon, LinuxIcon } from 'assets/icons';
import { SystemsRequirements } from 'types';

import System from '../System';
import useStyles from './useStyles';

interface Props {
  systems: SystemsRequirements;
}

const Systems = (props: Props) => {
  const [tab, setTab] = React.useState(0);
  const { systems } = props;
  const { t } = useTranslation();
  const classes = useStyles();

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
        <Tab icon={<LinuxIcon className={classes.icon} />} />
        <Tab icon={<WindowsIcon className={classes.icon} />} />
        <Tab icon={<AppleIcon className={classes.icon} />} />
      </Tabs>
      {Object.values(systems).map((os, index) => (
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
