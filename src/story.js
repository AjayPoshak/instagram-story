import PropTypes from 'prop-types';
import React, { useState, memo, useEffect } from 'react';

import Timeline from './Timeline';
import StorySlider from './StorySlider';
import useInterval from './useInterval';


function detectImageDimensions(imgURL) {
	const img = document.createElement('img');
	img.src = imgURL;

	return new Promise(resolve => {
		const poll = setInterval(() => {
			if (img.naturalWidth) {
				clearInterval(poll);
			}

			return resolve({ width: img.naturalWidth, height: img.naturalHeight });
		}, 10);
	});
}

const Story = props => {
	const {
		children, delay, getCurrentSlideIndex, imageWidth, timelineAlign = 'bottom',
	} = props;
	const imageCount = React.Children.count(children);

	const [width, setWidth] = useState(imageWidth);
	const [idx, setIdx] = useState(0);
	const [internalDelay, setInternalDelay] = useState(delay);

	useEffect(() => {
		if (width === 0) {
			detectImageDimensions(children[0].props.src).then(res => {
				setWidth(res.width);
			});
		}
	});


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

	useInterval(nextImage, internalDelay);

	// Call `getCurrentSlideIndex` to notify updated slide index
	getCurrentSlideIndex(idx);

	const storyContainerStyle = {
		width: 'inherit',
		height: 'inherit',
		position: 'relative',
	};

	return (
		<section style={storyContainerStyle}>
			<StorySlider imageWidth={width} pivot={idx}>
				{children}
			</StorySlider>
			<Timeline animationIndex={idx} count={imageCount} align={timelineAlign} />
		</section>
	);
};

Story.defaultProps = {
	timelineAlign: 'top',
	getCurrentSlideIndex: () => {},
};

Story.propTypes = {
	timelineAlign: PropTypes.string,
	delay: PropTypes.string.isRequired,
	getCurrentSlideIndex: PropTypes.func,
	imageWidth: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default memo(Story);
