import React from 'react';
import PropTypes from 'prop-types'


const Timeline = (props) => {
  const { animationIndex, count } = props;

  const renderElements = () => {
    const elements = [];
    for (let i = 0; i < count; i + 1) {
      let className = '';
      if (i < animationIndex) {
        className = '__fill';
      } else if (i === animationIndex) {
        className = '__active';
      }
      const element = <div className={className} key={i} />;
      elements.push(element);
    }
    return elements;
  };

  return (
    <section className="timeline-section">
      <article>
        {renderElements()}
      </article>
    </section>
  );
};


Timeline.propTypes = {
  animationIndex: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
}

export default Timeline;
