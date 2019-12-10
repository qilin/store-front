import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from 'styles/colors';

export default makeStyles({
  root: {
    background: BACKGROUND_DARK,
    height: '432px',
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 224px)',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.61) 0%, rgba(0, 0, 0, 0) 19.2%)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  image: {
    width: '100%',
    height: '100%',
    transition: 'transform 200ms',
  },
  rating: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    color: 'white',
    zIndex: 1,
  },
  content: {
    background: BACKGROUND_DARK,
    color: 'white',
    height: '224px',
    padding: '24px',
    display: 'flex',
    textAlign: 'start',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  subtitle: {
    opacity: '0.5',
  },
  iconWrapper: {
    marginRight: '12px',
    fill: 'white',
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
