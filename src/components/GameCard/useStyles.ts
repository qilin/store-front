import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from 'styles/colors';

export default makeStyles({
  root: {
    position: 'relative',
    height: '432px',
    background: BACKGROUND_DARK,
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    padding: '0 24px',
    background: BACKGROUND_DARK,
    color: 'white',
  },
  priceSmall: {
    fontSize: '12px',
    opacity: '0.5',
  },
  priceBig: {
    fontSize: '16px',
  },
  prices: {
    marginLeft: '8px',
  },
});
