import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from 'styles/colors';

export default makeStyles({
  root: {
    height: '432px',
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 80px)',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.61) 0%, rgba(0, 0, 0, 0) 19.2%)',
    overflow: 'hidden',
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
    height: '80px',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
