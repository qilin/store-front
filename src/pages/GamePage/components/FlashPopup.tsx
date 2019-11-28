import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function FlashPopup(props: Props) {
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
}
