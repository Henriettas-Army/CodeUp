import React from 'react';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';

const PreviewCarousel = () => (
  <Carousel
    autoplay
    autoplaySpeed={3000}
    infinite
    persistentNav
  >
    <Image size="small" src="/src/images/events.png" />
    <Image size="small" src="/src/images/users.png" />
    <Image size="small" src="/src/images/profile-1.png" />
    <Image size="small" src="/src/images/profile-2.png" />
    <Image size="small" src="/src/images/profile-3.png" />
    <Image size="small" src="/src/images/chat.png" />
  </Carousel>
);

export default PreviewCarousel;
