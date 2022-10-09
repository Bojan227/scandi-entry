import './App.css';
import { Nav } from './components/Nav';
import { CategoriesContainer } from './components/CategoriesContainer';
import { CartContainer } from './components/CartContainer';
import { ProductContainer } from './components/ProductContainer';
import React from 'react';

import { useQuery, gql } from '@apollo/client';

class App extends React.Component {
  state = {
    currentCategory: 0,
    currentCurrency: 0,
    cartItems: [],
    selectedAttributes: [],
    cartIsOpen: false,
    productPageIsOpen: false,
    product: undefined,
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
    console.log(product);
    this.setState(state => ({
      ...state,
      cartItems: state.cartItems.find(item => item.id === product.id)
        ? [...state.cartItems]
        : [...state.cartItems, { ...product, quantity: 1 }],
    }));
  };

  incrementQuantity = id => {
    this.setState(state => ({
      ...state,
      cartItems: state.cartItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      }),
    }));
  };

  decrementQuantity = id => {
    this.setState(state => ({
      ...state,
      cartItems: state.cartItems
        .map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        })
        .filter(item => item.quantity !== 0),
    }));
  };

  addAttribute = value => {
    console.log(value);
    this.setState(state => ({
      ...state,
      selectedAttributes: state.selectedAttributes.find(
        attribute => attribute === value
      )
        ? state.selectedAttributes.filter(att => att !== value)
        : [...state.selectedAttributes, value],
    }));
  };

  openCartPage = () => {
    this.setState(state => ({
      ...state,
      cartIsOpen: true,
    }));
  };

  closeCartPage = () => {
    this.setState(state => ({
      ...state,
      cartIsOpen: false,
    }));
  };

  openProductPage = () => {
    this.setState(state => ({
      ...state,
      productPageIsOpen: true,
    }));
  };

  closeProductPage = () => {
    this.setState(state => ({
      ...state,
      productPageIsOpen: false,
    }));
  };

  addProduct = product => {
    this.setState(state => ({
      ...state,
      product: product,
    }));
  };

  render() {
    return (
      <div className="App">
        <Nav
          currentCategory={this.state.currentCategory}
          currentCurrency={this.state.currentCurrency}
          selectedAttributes={this.state.selectedAttributes}
          changeCategory={this.changeCategory}
          changeCurrency={this.changeCurrency}
          cartItems={this.state.cartItems}
          incrementQuantity={this.incrementQuantity}
          decrementQuantity={this.decrementQuantity}
          addAttribute={this.addAttribute}
          openCartPage={this.openCartPage}
          closeCartPage={this.closeCartPage}
          closeProductPage={this.closeProductPage}
        />
        {!this.state.cartIsOpen && !this.state.productPageIsOpen && (
          <CategoriesContainer
            currentCategory={this.state.currentCategory}
            currentCurrency={this.state.currentCurrency}
            addCartItems={this.addCartItems}
            openProductPage={this.openProductPage}
            addProduct={this.addProduct}
          />
        )}
        {this.state.cartIsOpen && !this.state.productPageIsOpen && (
          <CartContainer
            cartItems={this.state.cartItems}
            currentCurrency={this.state.currentCurrency}
            incrementQuantity={this.incrementQuantity}
            decrementQuantity={this.decrementQuantity}
            selectedAttributes={this.state.selectedAttributes}
            addAttribute={this.addAttribute}
            cartIsOpen={this.state.cartIsOpen}
          />
        )}
        {this.state.productPageIsOpen && (
          <ProductContainer
            {...this.state.product}
            addAttribute={this.addAttribute}
            selectedAttributes={this.state.selectedAttributes}
            currentCurrency={this.state.currentCurrency}

          />
        )}
      </div>
    );
  }
}

export default App;
