import React, { useContext, useState } from 'react';
import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { LauncherContext } from 'Launcher';
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
    appInfo,
    status,
    updateError,
    updateAvailable,
    changeChannel,
    versionToDownload,
    downloadUpdateAndInstall,
  } = useContext(LauncherContext);

  const [channel, setChannel] = useState();
  const classes = useStyles();

  const handleChangeChannel = (event: any) => {
    const newChannel = event.target.value;
    setChannel(newChannel);
    changeChannel(newChannel);
  };

  if (!appInfo) return null;

  const { version, channels } = appInfo;

  return (
    <>
      <Select className={classes.root} defaultValue={appInfo.channel} value={channel} onChange={handleChangeChannel}>
        {channels.map((value: string) => (
          <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
      </Select>
      <div className={classes.status}>
        {t(`update_status.${status}`, { currentVersion: version, versionToDownload })}
        <br />
        {updateError && t(`error_message.${updateError.code}`, updateError.code)}
      </div>
      {updateAvailable && <button onClick={downloadUpdateAndInstall}>{t('labels.download_and_install')}</button>}
    </>
  );
};

export default ChannelSwitcher;
