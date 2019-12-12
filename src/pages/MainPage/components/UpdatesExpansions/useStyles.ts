import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 80px)',
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
  cardWrapper: {
    width: 'calc(50% - 12px)',
    maxHeight: 280,
    minHeight: 280,
    marginBottom: 24,
  },
});
