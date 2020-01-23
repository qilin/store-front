import React from 'react';
import { Typography, Box, Avatar, Fab } from '@material-ui/core';
import { GameCard, PlatformIcons } from 'components';
import { Game } from 'types';
import { User } from 'generated/types';

import useStyles from '../useStyles';

interface Props {
  game: Game;
  friends?: User[];
  openGame: (slug: string) => void;
}

const FriendCard = (props: Props) => {
  const { game, openGame, friends = [] } = props;
  const likes = friends.length;
  const friend = friends[0];
  const friendName = friend.email;
  const friendImageSrc = friend.email; // avatar.url;
  const { title, media, platforms, id } = game;
  const imageSrc = media.screenshots[0].url;
  const classes = useStyles();

  const cardContent = (
    <>
      <div className={classes.imageWrapper}>
        <img className={classes.image} alt={title} title={title} src={imageSrc} />
      </div>
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="space-between"
        alignItems="center"
        className={classes.cardHeader}
      >
        <PlatformIcons platforms={platforms} wrapperClass={classes.platformIcon} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Avatar alt={friendName} src={friendImageSrc} />
          <Typography className={classes.friendName} variant="subtitle2">{friendName}</Typography>
          <Fab size="small" className={classes.likes}>{`+\u00A0${likes}`}</Fab>
        </Box>
      </Box>
    </>
  );
  const footerContent = <Typography variant="h6">{title}</Typography>;
  const mockLikeAndAddToCart = (id: string) => console.log(id);

  return (
    <Box key={id} className={classes.cardWrapper}>
      <GameCard
        game={game}
        openGame={openGame}
        likeGame={mockLikeAndAddToCart}
        addGameToCart={mockLikeAndAddToCart}
        cardContent={cardContent}
        footerContent={footerContent}
      />
    </Box>
  );
};

export default FriendCard;
