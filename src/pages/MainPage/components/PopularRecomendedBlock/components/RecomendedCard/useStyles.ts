import { makeStyles } from '@material-ui/core/styles';
import { BACKGROUND_DARK } from 'styles/colors';

export default makeStyles({
  root: {
    height: 432,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 224px)',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.61) 0%, rgba(0, 0, 0, 0) 19.2%)',
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
    zIndex: 1,
    color: 'white',
  },
  content: {
    flexGrow: 1,
    padding: '24px',
    background: BACKGROUND_DARK,
    color: 'white',
    textAlign: 'start',
  },
  subtitle: {
    opacity: '0.5',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconWrapper: {
    marginRight: '12px',
    fill: 'white',
    color: 'white',
  },
});
