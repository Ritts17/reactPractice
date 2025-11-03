// import React, { Component } from 'react'

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 0
//     }
//   }

// handleIncreament = () => {
//   this.setState((prevState) => ({ counter: prevState.counter + 1 }));
//   this.setState((prevState) => ({ counter: prevState.counter + 1 }));
//   console.log(this.state.counter);
// }

// handleDecrement = () => {
//   this.setState((prevState) => ({ counter: prevState.counter - 1 }));
//   console.log(this.state.counter);
// }

//   resetValue = () => {
//     this.setState({ counter: 0 });
//   }
//   render() {

//     return (
//       <div className="App">
        // <h1>Counter: {this.state.counter}</h1>
        // <button onClick={this.handleIncreament}>+2</button>
        // <button onClick={this.resetValue}>Reset</button>
        // <button onClick={this.handleDecrement}>-</button>
//       </div>
//     )
//   }
// }

// export default App

import React from 'react'
import MovieList from './components/MovieList'
import Header from './components/Header'
import './App.css'
import Footer from './components/Footer'


function App() {

  return (
    <div className='App'>
      <Header/>
      <MovieList/>
      <Footer/>
    </div>
  )
}

export default App