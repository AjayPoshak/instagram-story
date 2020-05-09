import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import Story from '../story';

jest.useFakeTimers();

describe('story', () => {
	test('animation runs', () => {
		const getCurrentSlideIndex = jest.fn();
		const { container } = render(
			<Story delay="6000" imageWidth="628px" getCurrentSlideIndex={getCurrentSlideIndex}>
				<img
					data-testid="img-1"
					src="https://in.bmscdn.com/fanhood/categories/star-wars-1/small/story/1.jpg"
					alt=""
				/>
				<img
					data-testid="img-2"
					src="https://in.bmscdn.com/fanhood/categories/avenger-station-tshirt-1/small/story/2.jpg"
					alt=""
				/>
				<img
					data-testid="img-3"
					src="https://in.bmscdn.com/fanhood/categories/avenger-station-tshirt-1/small/story/1.jpg"
					alt=""
				/>
			</Story>,
		);

		const images = container.getElementsByTagName('img');
		expect(images.length).toBe(3);

		const timelineRoot = screen.getByTestId('timeline-root');
		const computedStyles = window.getComputedStyle(timelineRoot);
		// default alignment of timeline is top of page
		expect(computedStyles.top).toBe('0px');

		// first timeline element must be active
		expect(screen.getByTestId('timeline-0').classList.contains('__active')).toBe(true);
		expect(screen.getByTestId('timeline-1').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-2').classList.contains('__active')).toBe(false);
		expect(getCurrentSlideIndex).toHaveBeenCalledTimes(1);
		expect(getCurrentSlideIndex).toHaveBeenCalledWith(0);

		act(() => {
			jest.advanceTimersByTime(6000);
		});

		fireEvent(
			screen.getByTestId('timeline-0'),
			new MouseEvent('animationend', {
				bubbles: true,
				cancelable: true,
			}),
		);
		// first timeline element must be active
		expect(screen.getByTestId('timeline-0').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-0').classList.contains('__fill')).toBe(true);

		expect(screen.getByTestId('timeline-1').classList.contains('__active')).toBe(true);
		expect(screen.getByTestId('timeline-1').classList.contains('__fill')).toBe(false);

		expect(screen.getByTestId('timeline-2').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-2').classList.contains('__fill')).toBe(false);
		expect(getCurrentSlideIndex).toHaveBeenCalledTimes(2);
		expect(getCurrentSlideIndex).toHaveBeenCalledWith(1);

		act(() => {
			jest.advanceTimersByTime(6000);
		});

		fireEvent(
			screen.getByTestId('timeline-1'),
			new MouseEvent('animationend', {
				bubbles: true,
				cancelable: true,
			}),
		);

		// second timeline element must be active
		expect(screen.getByTestId('timeline-0').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-0').classList.contains('__fill')).toBe(true);

		expect(screen.getByTestId('timeline-1').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-1').classList.contains('__fill')).toBe(true);

		expect(screen.getByTestId('timeline-2').classList.contains('__active')).toBe(true);
		expect(screen.getByTestId('timeline-2').classList.contains('__fill')).toBe(false);
		expect(getCurrentSlideIndex).toHaveBeenCalledTimes(3);
		expect(getCurrentSlideIndex).toHaveBeenCalledWith(2);

		act(() => {
			jest.advanceTimersByTime(6000);
		});

		fireEvent(
			screen.getByTestId('timeline-2'),
			new MouseEvent('animationend', {
				bubbles: true,
				cancelable: true,
			}),
		);

		// third timeline element must be active
		expect(screen.getByTestId('timeline-0').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-0').classList.contains('__fill')).toBe(true);

		expect(screen.getByTestId('timeline-1').classList.contains('__active')).toBe(false);
		expect(screen.getByTestId('timeline-1').classList.contains('__fill')).toBe(true);

		expect(screen.getByTestId('timeline-2').classList.contains('__active')).toBe(true);
		expect(screen.getByTestId('timeline-2').classList.contains('__fill')).toBe(false);
	});
});
