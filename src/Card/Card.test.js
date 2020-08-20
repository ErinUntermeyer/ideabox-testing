import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Card Component', () => {

	it('Should have the correct content when rendered', () => {
		// make sure there is a title, description and button on the DOM

		// set up - render a card with the props we want to test
		const card = render(<Card
			title="study"
			description="stop crying"
			id={1}
			removeIdea={jest.fn()}
		/>)

		// screen.debug() will print the mocked DOM in the terminal

		// execution - query the elements we care about
		const title = screen.getByText("study")
		const description = screen.getByText("stop crying")
		const button = screen.getByRole("button")

		// assertion - will need an extra tool - import jest-dom to check and see if our elements are on the DOM
		expect(title).toBeInTheDocument()
		expect(description).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('Should fire a function when the delete button is clicked', () => {
		// when the delete button is clicked, make sure the appropriate function gets called

		// set up - render a card with the props we want to test
		const mockRemoveIdea = jest.fn() // this allows us to use the variable later
		const card = render(<Card
			title="study"
			description="stop crying"
			id={1}
			removeIdea={mockRemoveIdea}
		/>)

		// execution - find the delete button, click on the delete button
		const button = screen.getByRole("button") // can have a second argument with name if more than one element
		fireEvent.click(button)


		// assertion - the functionality for actually deleting lives on App... so we cant see if the card is removed without rendering the app - we want to instead make sure that the removeIdea button gets called the right number of times with the correct arguments
		expect(mockRemoveIdea).toBeCalledTimes(1)
		expect(mockRemoveIdea).toBeCalledWith(1)
	})

})