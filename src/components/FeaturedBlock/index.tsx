import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Container } from '@material-ui/core';
import { Game } from 'types';

import mockedGame from './mockedGame';
import FeaturedCard from './components/FeaturedCard';

interface Props {
  games?: Game[];
}

const FeaturedBlock = (props: Props) => {
  const { games = [mockedGame, mockedGame, mockedGame, mockedGame] } = props;
  return (
    <Container maxWidth="lg">
      <Carousel autoPlay showStatus={false} showThumbs={false} infiniteLoop>
        {games.map((game, index) => (
          <FeaturedCard key={game.id + index} game={game} />
        ))}
      </Carousel>
    </Container>
  );
};

export default FeaturedBlock;
