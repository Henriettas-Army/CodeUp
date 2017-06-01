import React from 'react';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';

const PreviewCarousel = () => (
  <Carousel
    autoplay
    autoplaySpeed={5000}
    infinite
    persistentNav
  >
    <Image size="small" src="https://s3.us-east-2.amazonaws.com/codeupcarousel/profile-1.png" />
    <Image size="small" src="https://s3.us-east-2.amazonaws.com/codeupcarousel/profile-2.png" />
    <Image size="small" src="https://s3.us-east-2.amazonaws.com/codeupcarousel/events.png" />
    <Image size="small" src="https://s3.us-east-2.amazonaws.com/codeupcarousel/users.png" />
    <Image size="small" src="https://s3.us-east-2.amazonaws.com/codeupcarousel/profile-3.png" />
    <Image size="small" src="https://s3.us-east-2.amazonaws.com/codeupcarousel/profile-4.png" />
  </Carousel>
);

export default PreviewCarousel;
