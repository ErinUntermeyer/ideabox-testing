import React, { Component } from 'react';
import Form from '../Form/Form';
import Ideas from '../Ideas/Ideas'
import { getIdeas } from '../apiCalls'
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
			ideas: [],
			error: ''
    };
	}
	
	componentDidMount() {
		getIdeas()
			.then(data => this.setState({ ideas: data }))
			.catch(error => this.setState({ error: error }))
	}

  addIdea = newIdea => {
    this.setState({ ideas: [...this.state.ideas, newIdea]})
  }

  removeIdea = id => {
    const ideas = this.state.ideas.filter(idea => idea.id !== id);
    this.setState({ ideas });
  }

  render() {
    return (
      <main className="App">
        <h1>IdeaBox</h1>
        <Form addIdea={this.addIdea} />
        <Ideas 
          ideas={this.state.ideas} 
          removeIdea={ this.removeIdea} 
        />
      </main>
    )
  }
}