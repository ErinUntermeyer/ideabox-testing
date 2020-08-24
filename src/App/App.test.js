import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('App', () => {
	it('should add a card to the DOM when the form is filled out', () => {
		// set up - render the app
		render(<App />)

		// execution - fill out the form component, submit the form, find the resulting card
		const titleInput = screen.getByPlaceholderText('title')
		const descriptionInput = screen.getByPlaceholderText('description')
		const submitButton = screen.getByRole('button', {name:'Submit!'})

		fireEvent.change(titleInput, {target: { value: 'New Title' }})
		fireEvent.change(descriptionInput, {target: { value: 'New Description' }})

		fireEvent.click(submitButton)

		const newTitle = screen.getByRole('heading', {name: 'New Title'})
		const newDescription = screen.getByText('New Description')

		// assertion
		expect(newTitle).toBeInTheDocument()
		expect(newDescription).toBeInTheDocument()

	})

})

// test here that input fields get cleared upon clicking submit
// test here that you cannot have empty inputs 