import './App.css';
import { Nav } from './components/Nav';
import { CategoriesContainer } from './components/CategoriesContainer';
import React from 'react';
import { useQuery, gql } from '@apollo/client';

class App extends React.Component {
  state = {
    currentCategory: 0,
    currentCurrency: 0,
    cartItems: [],
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

  addCartItems = product => {
    this.setState(state => ({
      ...state,
      cartItems: state.cartItems.some(item => item.id === product.id)
        ? [...state.cartItems]
        : [...state.cartItems, { ...product, quantity: 1 }],
    }));
    console.log(this.state.cartItems);
  };

  render() {
    return (
      <div className="App">
        <Nav
          currentCategory={this.state.currentCategory}
          currentCurrency={this.state.currentCurrency}
          changeCategory={this.changeCategory}
          changeCurrency={this.changeCurrency}
          cartItems={this.state.cartItems}
        />
        <CategoriesContainer
          currentCategory={this.state.currentCategory}
          currentCurrency={this.state.currentCurrency}
          addCartItems={this.addCartItems}
        />
      </div>
    );
  }
}

export default App;
