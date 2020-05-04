import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

function addStyles(selector, styles, id) {
	if (styles.length) {
		const style = document.createElement('style');
		style.id = id;
		document.head.appendChild(style);
		const styleSheet = style.sheet;
		styleSheet.insertRule(`${selector} { ${styles} }`, styleSheet?.cssRules?.length);
	}
}

function removeElement(selector) {
	const element = document.querySelector(selector)
	if (element) element.remove()
}

const Timeline = props => {
	const { animationIndex, count, align } = props;

	useEffect(() => {
		const timelineStyle = `
			content: '';
			width: 100%;
			height: 2px;
			display: block;
			background-color: #fff;
			transform-origin: 0% center 0px;
			animation: loader 2s linear;
		`;
		const fillStyle = 'background-color: #fff !important;';
		const loaderAnimation = ` 
			0% {
				transform: scaleX(0);
			  }
			  100% {
			  	transform: scaleX(1);
			  }
		  
		 `;
		addStyles('.__active::after', timelineStyle, 'js-insta-story-plugin-active');
		addStyles('.__fill', fillStyle, 'js-insta-story-plugin-fill');
		addStyles('@keyframes loader', loaderAnimation, 'js-insta-story-plugin-animation');

		return (() => {
			removeElement('js-insta-story-plugin-active')
			removeElement('js-insta-story-plugin-fill')
			removeElement('js-insta-story-plugin-animation')
		})
	}, []);

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
				flex: '1 0',
				height: '2px',
				margin: '5px',
				backgroundColor: '#999',
			};

			const element = <div style={elementStyle} className={className} key={i} />;
			elements.push(element);
		}
		return elements;
	};

	const alignContainer = {
		...(align === 'top' ? { top: '0' } : { bottom: '0' }),
	};

	const timelineStyle = {
		width: 'inherit',
		position: 'fixed',
		...alignContainer,
	};

	const timelineArticleStyle = {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<section style={timelineStyle}>
			<article style={timelineArticleStyle}>{renderElements()}</article>
		</section>
	);
};

Timeline.propTypes = {
	align: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	animationIndex: PropTypes.number.isRequired,
};

export default memo(Timeline);
