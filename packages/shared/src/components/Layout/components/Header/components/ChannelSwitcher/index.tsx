import React, { useContext, useState } from 'react';
import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { LauncherContext } from '@qilin/shared/src/App';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    marginLeft: 15,
    color: 'white',
  },
  status: {
    color: 'white',
    padding: '0 10px',
  },
});

const ChannelSwitcher = () => {
  const { info, status, changeChannel, readyToDownload, downloadUpdateAndInstall } = useContext(LauncherContext);
  const { t } = useTranslation();
  const [channel, setChannel] = useState(info.channel);
  const classes = useStyles();

  const handleChangeChannel = (event: any) => {
    const newChannel = event.target.value;
    setChannel(newChannel);
    changeChannel(newChannel);
  };

  const handleDownload = () => downloadUpdateAndInstall();

  return (
    <>
      <Select className={classes.root} value={channel} onChange={handleChangeChannel}>
        {info.channels.map((value: string) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
      <div className={classes.status}>
        {status}
      </div>
      {readyToDownload && <button onClick={handleDownload}>{t('labels.download_and_install')}</button>}
    </>
  );
};

export default ChannelSwitcher;
