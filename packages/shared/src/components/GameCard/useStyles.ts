import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from '@qilin/shared/src/styles/colors';

export default makeStyles({
  root: {
    cursor: 'pointer',
    position: 'relative',
    height: '100%',
    background: BACKGROUND_DARK,
    '&:hover $footerLeft': {
      display: 'none',
    },
    '&:hover $hoverContent': {
      transform: 'translateY(0)',
    },
  },
  content: {},
  hoverContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
    background: BACKGROUND_DARK,
    fill: 'white',
    transform: 'translateY(120%)',
    opacity: '0.7',
    transition: '200ms all',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    overflow: 'hidden',
    padding: '0 24px',
    background: BACKGROUND_DARK,
    color: 'white',
  },
  footerLeft: {
    transition: '200ms all',
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
