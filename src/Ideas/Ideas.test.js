import React from 'react'
import Ideas from './Ideas'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Ideas Component', () => {

	it('should render the number of cards === the length of the array passed in (integration test)', () => {
		// Set up - render the Ideas component
		const ideas = [
			{
				title: 'Feed the birds',
				id: 1,
				description: 'Tuppence a bag'
			},
			{
				title: 'Dogs should vote',
				id: 2,
				description: 'Why not?'
			},
		]

		render(<Ideas
			ideas={ideas}
			removeIdea={jest.fn()}
			/>)

		// Execution - query our elements
		// dont want two h2 tags, only the actual cards
		const headingOne = screen.getByRole('heading', {name: 'Feed the birds'})
		const headingTwo = screen.getByRole('heading', {name: 'Dogs should vote'})


		// Assertion - see if our cards are on the dom
		expect(headingOne).toBeInTheDocument()
		expect(headingTwo).toBeInTheDocument()



	})

	it('should', () => {
		// should render an h2 with the text Ideas Component (unit test)
		// Set up

		// Execution

		// Assertion
	})

})