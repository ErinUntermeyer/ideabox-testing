import React from 'react'
import App from './App'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getIdeas } from '../apiCalls'
jest.mock('../apiCalls.js')

describe('App', () => {
	it('should add a card to the DOM when the form is filled out', async () => {
		// set up - render the app
		getIdeas.mockResolvedValueOnce(
			[
				{
					"id": 1,
					"title": "Study",
					"description": "git lernt"
				}
			]
		)
		const { getByPlaceholderText, getByRole, getByText } = render(<App />)

		// execution - fill out the form component, submit the form, find the resulting card
		const titleInput = getByPlaceholderText('title')
		const descriptionInput = getByPlaceholderText('description')
		const submitButton = getByRole('button', {name:'Submit!'})

		fireEvent.change(titleInput, {target: { value: 'New Title' }})
		fireEvent.change(descriptionInput, {target: { value: 'New Description' }})

		fireEvent.click(submitButton)

		const newTitle = getByRole('heading', {name: 'New Title'})
		const newDescription = getByText('New Description')

		// assertion
		expect(newTitle).toBeInTheDocument()
		expect(newDescription).toBeInTheDocument()

	})

	it('should display idea cards from server when the app loads', async () => {
		// set up
		// mock the API fetch request
		getIdeas.mockResolvedValueOnce(
			[
				{
					"id": 1,
					"title": "Study",
					"description": "git lernt"
				},
				{
					"id": 2,
					"title": "SLEEP",
					"description": "go to bed plz"
				},
				{
					"id": 3,
					"title": "Pet Kitty",
					"description": "because kitties love pets"
				}
			]
		)
		// render App
		const { findByRole, findByText } = render(<App />)

		// execution
		// locate the container that holds the ideas on the page
		// assert them to be there
		const ideasContainer = await findByRole('heading', {name: /ideas component/i})
		expect(ideasContainer).toBeInTheDocument()
		
		// locate the ideas that are on the page
		// assert them to be there
		const ideaOne = await findByText(/git lernt/i)
		const ideaTwo = await findByText(/go to bed plz/i)
		const ideaThree = await findByText(/because kitties love pets/i)
		expect(ideaOne).toBeInTheDocument()
		expect(ideaTwo).toBeInTheDocument()
		expect(ideaThree).toBeInTheDocument()

		// assertion
		// done above below each different execution
	})

})

// test here that input fields get cleared upon clicking submit
// test here that you cannot have empty inputs 