import React from 'react'
import { render, screen } from '@testing-library/react'
import StorySlider from '../StorySlider'

describe('StorySlider', () => {
	test('"StorySlider" component renders', () => {
		const { rerender } = render(
			<StorySlider pivot={0} imageWidth="628px">
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
			</StorySlider>,
		)
		let image1 = screen.getByTestId('img-1')
		let style1 = window.getComputedStyle(image1)

		expect(style1.position).toBe('absolute')
		expect(style1.left).toBe('0px')

		let image2 = screen.getByTestId('img-2')
		let style2 = window.getComputedStyle(image2)

		expect(style2.position).toBe('absolute')
		expect(style2.left).toBe('628px')

		let image3 = screen.getByTestId('img-3')
		let style3 = window.getComputedStyle(image3)

		expect(style3.position).toBe('absolute')
		expect(style3.left).toBe('1256px')

		rerender(
			<StorySlider pivot={1} imageWidth="628px">
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
			</StorySlider>,
		)

		image1 = screen.getByTestId('img-1')
		style1 = window.getComputedStyle(image1)

		expect(style1.position).toBe('absolute')
		expect(style1.left).toBe('-628px')

		image2 = screen.getByTestId('img-2')
		style2 = window.getComputedStyle(image2)

		expect(style2.position).toBe('absolute')
		expect(style2.left).toBe('0px')

		image3 = screen.getByTestId('img-3')
		style3 = window.getComputedStyle(image3)

		expect(style3.position).toBe('absolute')
		expect(style3.left).toBe('628px')

		rerender(
			<StorySlider pivot={2} imageWidth="628px">
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
			</StorySlider>,
		)

		image1 = screen.getByTestId('img-1')
		style1 = window.getComputedStyle(image1)

		expect(style1.position).toBe('absolute')
		expect(style1.left).toBe('-1256px')

		image2 = screen.getByTestId('img-2')
		style2 = window.getComputedStyle(image2)

		expect(style2.position).toBe('absolute')
		expect(style2.left).toBe('-628px')

		image3 = screen.getByTestId('img-3')
		style3 = window.getComputedStyle(image3)

		expect(style3.position).toBe('absolute')
		expect(style3.left).toBe('0px')
	})
})
