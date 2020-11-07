import React, {useState, useEffect} from 'react';
import loader from './loader.svg';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import './App.css';

function App () {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
      .then(users => setRobots(users));
  }, []);

 const onSearchChange = (event) => {
    setSearchfield(event.target.value);
   }
     const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
       <img src={loader} alt='loader' className='loader' /> :
      (
         <div className='tc'>
           <h1 className='f1'>RoboFriends</h1>
           <SearchBox searchChange={onSearchChange}/>
           <Scroll>
            <ErrorBoundary>
             <CardList robots={filteredRobots} />
            </ErrorBoundary>
           </Scroll>
        </div>
      );
}

export default App;