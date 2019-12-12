import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {},
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
  cardHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: '8px 24px',
    color: 'white',
  },
  friendName: {
    margin: '0 8px',
  },
  likes: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
  },
  cardWrapper: {
    width: '100%',
    maxHeight: 280,
    minHeight: 280,
    marginBottom: 24,
  },
  platformIcon: {
    marginRight: 8,
    fill: 'white',
    color: 'white',
    '& svg': {
      width: 16,
      height: 16,
    },
  },
});
