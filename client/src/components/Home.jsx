import React from 'react';
import HorizontalSlider from './HorizontalSlider';
import swiperImages from '../assets/swiperImages';
import { Button } from 'react-bootstrap';
import PageTransition from './PageTransition';

function Home() {
  return (
    <PageTransition>
      <div className="w-75 mx-auto" style={{ height: '500px' }}>
        <div className="title">Game of Thrones</div>
        <div className="sub-text w-50">
          <div className="mb-5">
            Nine noble families fight for control over the lands of Westeros,
            while an ancient enemy returns after being dormant for millennia.
          </div>
          <div>Last watched: season 2 - episode 4</div>
        </div>
        <Button className="mt-4" variant="secondary">
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
    </PageTransition>
  );
}

export default Home;
