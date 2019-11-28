const ORDER_URL = 'order';

export const buildWidget = async () => {
  const widget = await (window as any).RamblerPayment.buildWidget('PaymentPopup', {
    color: '#315efb',
    font: 'Roboto',
    lang: 'ru',
    // способы оплаты (табы с оплатой)
    tabs: [{
      // оплата картой
      tab: 'AC',
    }, {
      // выбор из нескольких способов оплаты
      tab: 'composite',
      paymentTypes: ['PC', 'MC', 'GP', 'WM', 'SB'],
    }, {
      // оплата банковской картой
      tab: 'PC',
    }],
  });

  return widget;
};

export const getOrder = async (gameId: string, itemId: string) => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // eslint-disable-next-line @typescript-eslint/camelcase
    body: JSON.stringify({ game_id: gameId, item_id: itemId }),
  };

  const responce = await fetch(ORDER_URL, request);
  const order = await responce.json();
};
