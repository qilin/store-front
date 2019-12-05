import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const FlashPopup = (props: Props) => {
  const { open, handleClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Ой, чего-то не хватает!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для игры нужно установить последнюю версию
          </DialogContentText>
          <DialogContentText>
            <b>Adobe Flash Player</b>
          </DialogContentText>
          <DialogContentText>
            или разрешить его работу
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button href="https://get.adobe.com/ru/flashplayer/" target="_blank" color="primary">
            Разрешить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FlashPopup;
