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
  const { t } = useTranslation();
  const {
    info,
    status,
    updateAvailable,
    changeChannel,
    versionToDownload,
    downloadUpdateAndInstall,
  } = useContext(LauncherContext);
  const { channel: initialChannel, version, channels } = info;
  const [channel, setChannel] = useState(initialChannel);
  const classes = useStyles();

  const handleChangeChannel = (event: any) => {
    const newChannel = event.target.value;
    setChannel(newChannel);
    changeChannel(newChannel);
  };

  return (
    <>
      <Select className={classes.root} value={channel} onChange={handleChangeChannel}>
        {channels.map((value: string) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
      <div className={classes.status}>
        {t(`update_status.${status}`, { currentVersion: version, versionToDownload })}
      </div>
      {updateAvailable && <button onClick={downloadUpdateAndInstall}>{t('labels.download_and_install')}</button>}
    </>
  );
};

export default ChannelSwitcher;