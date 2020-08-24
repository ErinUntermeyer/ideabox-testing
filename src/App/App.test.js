import React from 'react'
import App from './App'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
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

	//// using findBy
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
		const { findByRole, findByText, } = render(<App />)

		// execution
		// locate the container that holds the ideas on the page
		const ideasContainer = await findByRole('heading', {name: /ideas component/i})
		
		// locate the ideas that are on the page
		const ideaOne = await findByText(/git lernt/i)
		const ideaTwo = await findByText(/go to bed plz/i)
		const ideaThree = await findByText(/because kitties love pets/i)
		
		// assertion
		expect(ideasContainer).toBeInTheDocument()
		expect(ideaOne).toBeInTheDocument()
		expect(ideaTwo).toBeInTheDocument()
		expect(ideaThree).toBeInTheDocument()
	})

})

//// using waitFor
it('should display cards from the server when the app loads', async () => {
	// Render the App component (this component fetches data from an external back-end API)
	getIdeas.mockResolvedValueOnce(
		[
			{
				"id": 1,
				"title": "Sweaters for pugs",
				"description": "To keep them warm"
			},
			{
				"id": 2,
				"title": "A romcom",
				"description": "But make it ghosts"
			},
			{
				"id": 3,
				"title": "A game show called Ether/Or",
				"description": "When you lose you get chloroformed"
			}
		]
	)     
	render(<App />)
	// Check that there is a container element on the page                                      
	const containerHeading = screen.getByRole('heading', { name: 'Ideas Component' }) 
	expect(containerHeading).toBeInTheDocument()
	// Check that there are ideas on the page                                                 
	const ideaOne = await waitFor(() => screen.getByText('Sweaters for pugs')) 
	const ideaTwo = await waitFor(() => screen.getByText('A romcom')) 
	const ideaThree = await waitFor(() => screen.getByText('A game show called Ether/Or')) 
	
	expect(ideaOne).toBeInTheDocument()
	expect(ideaTwo).toBeInTheDocument()
	expect(ideaThree).toBeInTheDocument()
	
})