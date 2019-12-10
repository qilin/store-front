import { makeStyles } from '@material-ui/core/styles';
import { TITLE_GREY } from 'styles/colors';

export default makeStyles({
  root: {
    minHeight: '438px',
    '& .carousel .slide': {
      backgroundColor: 'transparent',
    },
    '& .control-dots': {
      paddingInlineStart: 0,
    },
    '& .carousel .control-dots .dot': {
      position: 'relative',
      transition: 'opacity .25s ease-in',
      opacity: '0.6',
      background: '#121212',
      width: '16px',
      height: '16px',
    },
    '& .carousel .control-dots .dot.selected': {
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '8px',
        height: '8px',
        top: '4px',
        left: '4px',
        borderRadius: '50%',
        background: 'white',
      },
    },
  },
  green: {
    height: '432px',
    backgroundColor: 'green',
  },
  cardWrapper: {
    paddingBottom: '56px',
    backgroundColor: 'transparent',
  },
  title: {
    color: TITLE_GREY,
    padding: '1rem',
  },
  slide: {
    backgroundColor: 'transparent',
  },
  controlDots: {
    paddingInlineStart: 0,
  },
  dot: {
    position: 'relative',
    transition: 'opacity .25s ease-in',
    opacity: '0.6',
    background: '#121212',
    width: '16px',
    height: '16px',
  },
  selected: {
    '::after': {
      content: '',
      position: 'absolute',
      width: '8px',
      height: '8px',
      top: '4px',
      left: '4px',
      borderRadius: '50%',
      background: 'white',
    },
  },
});
