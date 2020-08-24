export const getIdeas = () => {
	return fetch('http://localhost:3001/api/v1/ideas')
		.then(response => response.json())
}