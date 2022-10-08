import './App.css';
import { Nav } from './components/Nav';
import { CategoriesContainer } from './components/CategoriesContainer';
import React from 'react';
import { useQuery, gql } from '@apollo/client';

class App extends React.Component {
  state = {
    currentCategory: 0,
    currentCurrency: 0,
  };

  changeCategory = index => {
    this.setState(state => ({
      ...state,
      currentCategory: index,
    }));
  };

  changeCurrency = index => {
    this.setState(state => ({
      ...state,
      currentCurrency: index,
    }));
  };

  render() {
    return (
      <div className="App">
        <Nav
          currentCategory={this.state.currentCategory}
          currentCurrency={this.state.currentCurrency}
          changeCategory={this.changeCategory}
          changeCurrency={this.changeCurrency}
        />
        <CategoriesContainer
          currentCategory={this.state.currentCategory}
          currentCurrency={this.state.currentCurrency}
        />
      </div>
    );
  }
}

export default App;
