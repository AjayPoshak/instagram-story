import React, { memo } from 'react';
import PropTypes from 'prop-types'


const Timeline = (props) => {
  const { animationIndex, count } = props;

  const renderElements = () => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      let className = '';
      if (i < animationIndex) {
        className = '__fill';
      } else if (i === animationIndex) {
        className = '__active';
      }

      // Styling the div's
      const elementStyle = {
        width: '20%',
        height: '2px',
        margin: '5px',
        backgroundColor: '#999',
      }

      const element = <div style={elementStyle} className={className} key={i} />;
      elements.push(element);
    }
    return elements;
  };

  const timelineStyle = {
    width: 'inherit',
    position: 'fixed',
    bottom: 0,
  }

  const timelineArticleStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <section style={timelineStyle}>
      <article style={timelineArticleStyle}>
        {renderElements()}
      </article>
    </section>
  );
};


Timeline.propTypes = {
  animationIndex: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
}

export default memo(Timeline);
