import { makeStyles } from '@material-ui/core/styles';
import { TITLE_GREY, BLACK } from '@qilin/shared/src/styles/colors';

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
      width: '16px',
      height: '16px',
      background: BLACK,
      opacity: '0.6',
      transition: 'opacity .25s ease-in',
    },
    '& .carousel .control-dots .dot.selected': {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '4px',
        left: '4px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'white',
      },
    },
  },
  cardWrapper: {
    paddingBottom: '56px',
    backgroundColor: 'transparent',
  },
  title: {
    padding: '1.5rem 0',
    color: TITLE_GREY,
  },
});
