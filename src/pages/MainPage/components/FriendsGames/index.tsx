import React from 'react';
import { Typography, Box, Avatar, Fab } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GameCard, PlatformIcons } from 'components';
import { FriendGame } from 'types';

import useStyles from './useStyles';
import { HeaderWithMoreBtn } from '../index';

interface Props {
  games: FriendGame[];
  openGame: (id: string) => void;
  handleMore: () => void;
}

const FriendsGames = (props: Props) => {
  const { games, openGame, handleMore } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <HeaderWithMoreBtn title={t('titles.friends_games')} handleMore={handleMore} />
      <Box display="flex" flexWrap="wrap">
        {games.slice(0, 2).map(friendGame => {
          const { game, friend, likes } = friendGame;
          const friendName = friend.display.display_name;
          const friendImageSrc = friend.display.avatar.url;
          const { title, media, platforms, id } = game;
          const imageSrc = media.screenshots[0].url;
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
        })}
      </Box>
    </div>
  );
};

export default FriendsGames;
