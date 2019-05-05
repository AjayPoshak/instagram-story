import React, { memo } from 'react';
import PropTypes from 'prop-types'

const StorySlider = ({ pivot, children, imageWidth }) => {
  const newChildren = React.Children.map(children, ((child, index) => {
    const style = { position: 'absolute' };
    if (index < pivot) {
      style.left = `-${Math.abs(index - pivot) * parseInt(imageWidth, 10)}px`;
    } else if (index === pivot) {
      style.left = '0';
    } else {
      style.left = `${Math.abs(index - pivot) * parseInt(imageWidth, 10)}px`;
    }

    return React.cloneElement(child, { style });
  }));

  return (
    <article className="slider-section">{newChildren}</article>
  );
};

StorySlider.propTypes = {
  pivot: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  imageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default memo(StorySlider);
