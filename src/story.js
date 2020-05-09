import PropTypes from 'prop-types';
import React, { useState, memo, useEffect } from 'react';

import Timeline from './Timeline';
import StorySlider from './StorySlider';


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

	useEffect(() => {
		if (width === 0) {
			detectImageDimensions(children[0].props.src).then(res => {
				setWidth(res.width);
			});
		}
	}, [children, width]);


	const onCarouselIndexChange = () => {
		if (idx < imageCount - 1) {
			setIdx(idx + 1);
		}
	};

	// Call `getCurrentSlideIndex` to notify updated slide index
	getCurrentSlideIndex(idx);

	const storyContainerStyle = {
		width: 'inherit',
		height: 'inherit',
		overflow: 'hidden',
		position: 'relative',
	};

	return (
		<section style={storyContainerStyle}>
			<StorySlider imageWidth={width} pivot={idx}>
				{children}
			</StorySlider>
			<Timeline
				delay={delay}
				count={imageCount}
				animationIndex={idx}
				align={timelineAlign}
				onCarouselIndexChange={onCarouselIndexChange}
			/>
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
