import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import FlashPopup from './components/FlashPopup';
import useStyles from './useStyles';
import { buildWidget, getOrder } from './helpers';

const GamePage = (props: RouteComponentProps) => {
  const [widget, setWidget] = useState(null);
  const [flashPopupOpen, setFlashPopupOpen] = useState(false);
  const parsedQueryString = queryString.parse(props.location.search);
  const uuid = typeof parsedQueryString.uuid === 'string' ? parsedQueryString.uuid : '';
  const classes = useStyles();
  const handleFlashClose = () => setFlashPopupOpen(false);
  const handleFlashOpen = () => setFlashPopupOpen(true);

  const initWidget = async () => {
    const buildedWidget = await buildWidget();
    setWidget(buildedWidget);
  };

  const showPayWidget = async (args: any) => {
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

    payWidget.on('close', (payment: any) => console.log('close', payment)),
      payWidget.on('destroy', (payment: any) => console.log('destroy', payment)),
      payWidget.on('fail', (payment: any) => console.log('fail', payment)),
      payWidget.on('success', (payment: any) => console.log('success', payment)),
      payWidget.on('pay', (payment: any) => console.log('pay', payment));
  };

  useEffect(() => {
    initWidget();
  }, []);

  return (
    <div className={classes.root}>
      <Button onClick={handleFlashOpen} className={classes.button}>Играть бесплатно</Button>
      <FlashPopup open={flashPopupOpen} handleClose={handleFlashClose} />
    </div>
  );
};

export default GamePage;
