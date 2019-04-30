import PropTypes from 'prop-types'
import React, { useState, memo } from 'react';

import Timeline from './Timeline';
import StorySlider from './StorySlider';
import useInterval from './useInterval';

import './App.css';

function detectImageDimensions(imgURL) {
  const img = document.createElement('img');
  img.src = imgURL;

  return new Promise((resolve) => {
    const poll = setInterval(() => {
      if (img.naturalWidth) {
        clearInterval(poll);
      }

      return resolve({ width: img.naturalWidth, height: img.naturalHeight });
    }, 10);
  });
}

const Story = (props) => {
  const { children, delay } = props;

  const imageCount = React.Children.count(children);

  const [w, setW] = useState(0);
  const [idx, setIdx] = useState(0);
  const [internalDelay, setInternalDelay] = useState(delay);

  if (w === 0) {
    detectImageDimensions(children[0].props.src).then((res) => {
      setW(res.width);
    });
  }

  const stopTimer = () => {
    setInternalDelay(null);
  };

  const nextImage = () => {
    if (idx < imageCount - 1) {
      setIdx(idx + 1);
    } else {
      stopTimer();
    }
  };
  console.log(children, delay)
  useInterval(nextImage, internalDelay);
  console.log('useInterval')
  return (
    <section>
      <StorySlider imageWidth={w} pivot={idx}>{children}</StorySlider>
      <Timeline animationIndex={idx} count={imageCount} />
    </section>
  );
};

Story.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  delay: PropTypes.string.isRequired,
}

export default memo(Story);
