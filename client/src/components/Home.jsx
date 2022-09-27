import React from 'react';
import HorizontalSlider from './HorizontalSlider';
import swiperImages from '../assets/swiperImages';
import { Button } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <div className="w-75 mx-auto" style={{ height: '500px' }}>
        <div className="home-heading">Game of Thrones</div>
        <div className="fs-4">season 2 - episode 4</div>
        <Button
          className="mt-4"
          style={{ borderRadius: '1.1rem' }}
          variant="secondary"
        >
          Continue Watching
        </Button>
      </div>
      <div>
        <div className="m-3 ms-5">Continue watching</div>
        <HorizontalSlider items={swiperImages} />
      </div>
      <div>
        <div className="m-3 ms-5">Recommended</div>
        <HorizontalSlider items={swiperImages} />
      </div>
      <div>
        <div className="m-3 ms-5">Action</div>
        <HorizontalSlider items={swiperImages} />
      </div>
    </div>
  );
}

export default Home;
