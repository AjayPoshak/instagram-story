import React from 'react'
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react'

import Timeline from '../Timeline'

jest.useFakeTimers();

describe('timeline component', () => {
	test('"timeline" re-renders correctly with changed props', () => {
		// @TODO: Add test to check for dynamic stylesheet insertion
		// As of now, jsdom doesn't support insertRules

		// Object.defineProperty(document, 'head', {
		// 	value: document.createElement('head'),
		// });

		const onCarouselIndexChange = jest.fn()

		const { rerender } = render(<Timeline
			count={5}
			align="top"
			delay="3000"
			animationIndex={1}
			onCarouselIndexChange={onCarouselIndexChange}
		/>)

		const timelineRoot = screen.getByTestId('timeline-root');
		let computedStyles = window.getComputedStyle(timelineRoot);
		// default alignment of timeline is top of page
		expect(computedStyles.top).toBe('0px');

		act(() => {
			jest.advanceTimersByTime(3000);
		});

		fireEvent(
			screen.getByTestId('timeline-0'),
			new MouseEvent('animationend', {
				bubbles: true,
				cancelable: true,
			}),
		);
		expect(onCarouselIndexChange).toHaveBeenCalledTimes(1)
		expect(onCarouselIndexChange).toHaveBeenCalledWith(2)

		rerender(<Timeline
			count={5}
			delay="5000"
			align="bottom"
			animationIndex={2}
			onCarouselIndexChange={onCarouselIndexChange}
		/>)

		// default alignment of timeline is bottom of page
		computedStyles = window.getComputedStyle(timelineRoot);
		expect(computedStyles.bottom).toBe('0px');

		act(() => {
			jest.advanceTimersByTime(5000);
		});

		fireEvent(
			screen.getByTestId('timeline-1'),
			new MouseEvent('animationend', {
				bubbles: true,
				cancelable: true,
			}),
		);
		expect(onCarouselIndexChange).toHaveBeenCalledTimes(2)
		expect(onCarouselIndexChange).toHaveBeenCalledWith(3)
	})
})
