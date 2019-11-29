import React, { useState, useEffect, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, IconButton } from '@material-ui/core';
import { HighlightOff, Fullscreen } from '@material-ui/icons';
import ErrorMessage from 'components/ErrorMessage';
import { env, getUrlParameter } from 'helpers';

import FlashPopup from './components/FlashPopup';
import useStyles from './useStyles';
import { buildWidget, getOrder } from './helpers';

const qilinStore = (window as any).qilinStore;
const USER_CLICKED_PLAY = 'USER_CLICKED_PLAY';
const isUserClickPlay = localStorage.getItem(USER_CLICKED_PLAY);
const isFlashEnabled = qilinStore.checkFlashEnabled();

const GamePage = (props: RouteComponentProps) => {
  const [widget, setWidget] = useState(null);
  const [error, setError] = useState('');
  const handleErrorClose = () => setError('');
  const [flashPopupOpen, setFlashPopupOpen] = useState(false);
  const handleFlashClose = () => setFlashPopupOpen(false);
  const [gameFrameSrc, setGameFrameSrc] = useState('');
  const [gameFrameOpen, setGameFrameOpen] = useState(false);
  const handleGameClose = () => setGameFrameOpen(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);
  const uuid = getUrlParameter('uuid', props.location.search);
  const classes = useStyles();

  const initWidget = async () => {
    const buildedWidget = await buildWidget();
    setWidget(buildedWidget);
  };

  const openIframe = () => {
    if (!isFlashEnabled) {
      localStorage.setItem(USER_CLICKED_PLAY, 'click');
      setFlashPopupOpen(true);
      return;
    }

    setGameFrameOpen(true);
  };

  const toggleFullscreen = (event: SyntheticEvent) => {
    const elem = event.currentTarget.parentElement;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen()
        .then(() => qilinStore.setFullscreen(true));
    } else {
      document.exitFullscreen();
      qilinStore.setFullscreen(false);
    }
  };

  const showPayWidget = async (args: any) => {
    try {
      const { itemId } = args;
      const data: any = await getOrder(uuid, itemId);
      const { order, products } = data;

      let payWidget: any;

      if (!widget) {
        payWidget = await buildWidget();
      } else {
        payWidget = widget;
      }

      payWidget.show();

      await payWidget.initializeOrder({
        order,
        products,
        canSaveCard: false,
      });

      payWidget.on('close', (payment: any) => console.log('close', payment));
      payWidget.on('destroy', (payment: any) => console.log('destroy', payment));
      payWidget.on('fail', (payment: any) => console.log('fail', payment));
      payWidget.on('success', (payment: any) => console.log('success', payment));
      payWidget.on('pay', (payment: any) => console.log('pay', payment));
    } catch (error) {
      setError(error.message);
    }
  };

  const initQilinSDK = async () => {
    try {
      const meta = await qilinStore.init({
        qilinProductUUID: uuid,
        apiURL: env('QILIN_SDK_INIT_URL'),
      });

      const { url } = meta;
      setGameFrameSrc(url);

      qilinStore.onFullscreenModeEnabled(() => {
        setFullscreenEnabled(true);
      });

      qilinStore.onShowPayForm(showPayWidget);

      if (isFlashEnabled && isUserClickPlay) {
        localStorage.removeItem(USER_CLICKED_PLAY);
        openIframe();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    initWidget();
    initQilinSDK();
  }, []);

  return (
    <div className={classes.root}>
      <Button onClick={openIframe} className={classes.button}>Играть бесплатно</Button>
      <FlashPopup open={flashPopupOpen} handleClose={handleFlashClose} />
      <ErrorMessage open={!!error} message={error || ''} handleClose={handleErrorClose} />
      {gameFrameOpen && (
        <div className={classes.frameWrapper}>
          <div className={classes.frameHeader}>
            {fullscreenEnabled && (
              <IconButton className={classes.iconButton} color="inherit" onClick={toggleFullscreen}>
                <Fullscreen className={classes.icon} />
              </IconButton>
            )}
            <IconButton className={classes.iconButton} color="inherit" onClick={handleGameClose}>
              <HighlightOff className={classes.icon} />
            </IconButton>
          </div>
          <iframe title="game" className={classes.frame} src={gameFrameSrc} frameBorder="0" allowFullScreen></iframe>
        </div>
      )}
    </div>
  );
};

export default GamePage;
