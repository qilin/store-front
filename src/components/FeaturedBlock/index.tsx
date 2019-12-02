import React from 'react';

import mockedGame from './mockedGame';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
const image = mockedGame.screenshots[0].url;

export default class DemoCarousel extends React.Component {
    render() {
        return (
            <Carousel autoPlay showStatus={false} showThumbs={false} infiniteLoop>

                <div>
                    <img src={image} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={image} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={image} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
}

// export default class FeaturedBlock extends React.Component {
//   render() {
//     return (
//       <Carousel autoplay autoplayReverse>
//         <img src={image} />
//         <img src={image} />
//         <img src={image} />
//         <img src={image} />
//       </Carousel>
//     );
//   }
// }

// import React from 'react';
// import Carousel from 'nuka-carousel';
// import mockedGame from './mockedGame';
// const image = mockedGame.screenshots[0].url;

// export default class FeaturedBlock extends React.Component {
//   render() {
//     return (
//       <Carousel autoplay autoplayReverse>
//         <img src={image} />
//         <img src={image} />
//         <img src={image} />
//         <img src={image} />
//       </Carousel>
//     );
//   }
// }

// import React from 'react';
// import mockedGame from './mockedGame';

// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';

// const image = mockedGame.screenshots[0].url;

// const Gallery = () => {
//   const handleOnDragStart = (e: any) => e.preventDefault();
//   return (
//     <AliceCarousel mouseTrackingEnabled>
//       <img src={image} onDragStart={handleOnDragStart} className="yours-custom-class" />
//       <img src={image} onDragStart={handleOnDragStart} className="yours-custom-class" />
//       <img src={image} onDragStart={handleOnDragStart} className="yours-custom-class" />
//       <img src={image} onDragStart={handleOnDragStart} className="yours-custom-class" />
      
//     </AliceCarousel>
//   );
// };

// export default Gallery;
