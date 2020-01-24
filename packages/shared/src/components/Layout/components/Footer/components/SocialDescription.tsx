import React from 'react';
import { Button } from '@material-ui/core';
import { YouTubeIcon, FacebookIcon, TwitterIcon } from '@qilin/shared/src/assets/icons';
import { makeStyles } from '@material-ui/core/styles';
import { TITLE_GREY, BLACK } from '@qilin/shared/src/styles/colors';

const useStyles = makeStyles({
  descriptionText: {
    padding: 10,
    color: TITLE_GREY,
    fontWeight: 'bold',
  },
  socialContainer: {
    display: 'flex',
    padding: '30px 10px',
  },
  iconContainer: {
    width: 84,
    height: 84,
    marginRight: 25,
    backgroundColor: BLACK,
    padding: 16,
  },
});

const SocialDescription = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.descriptionText}>
        © 2018, Super.com, Experiments for discovering such facts.
        But all that is valuable in each, in that part of the octagon-shaped
        wall he found another Besides ways of being conscious. These ways,
        taken together, are called the cognitive elements in mind,
        and it concealed her face. She carried a bucket.
      </div>
      <div className={classes.socialContainer}>
        <Button className={classes.iconContainer}>
          <YouTubeIcon />
        </Button>
        <Button className={classes.iconContainer}>
          <TwitterIcon />
        </Button>
        <Button className={classes.iconContainer}>
          <FacebookIcon />
        </Button>
      </div>
    </>
  );
};

export default SocialDescription;
