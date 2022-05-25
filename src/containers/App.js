import React, { Component } from 'react';
import CardList from '../components/CardList';
// import  { robots } from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundries from '../components/ErrorBoundries';


class App extends Component {
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(users => this.setState({robots: users}));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
     })
     return !robots.length ? 
       <h1>Loading</h1> :
        (
          <div className='tc '>
            <h1 className='f21'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
              <ErrorBoundries>
               <CardList robots={filteredRobots} />
              </ErrorBoundries>
            </Scroll>
          </div>
        );
      }    
  }  





export default App;