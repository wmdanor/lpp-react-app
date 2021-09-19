import * as React from 'react';
import Slider from 'react-slick';
import AppNavbar from './AppNavbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import sliderImg1 from '../../../images/header/1.jpg';
import sliderImg2 from '../../../images/header/2.jpg';
import sliderImg3 from '../../../images/header/3.jpg';
import sliderImg4 from '../../../images/header/4.jpg';
import sliderImg5 from '../../../images/header/5.jpg';

function AppHeader() {
  return (
    <>
      <header className="header">
        <h1 className="header-text">FeProject New</h1>
        <Slider
          dots={false}
          infinite
          speed={2000}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          adaptiveHeight={false}
          autoplay
          autoplaySpeed={8000}
          className="header-slider"
        >
          <div>
            <img src={sliderImg1} alt="???" />
          </div>
          <div>
            <img src={sliderImg2} alt="???" />
          </div>
          <div>
            <img src={sliderImg3} alt="???" />
          </div>
          <div>
            <img src={sliderImg4} alt="???" />
          </div>
          <div>
            <img src={sliderImg5} alt="???" />
          </div>
        </Slider>
      </header>
      <AppNavbar />
    </>
  );
}

export default AppHeader;
