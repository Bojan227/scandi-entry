import './App.css';
import { Nav } from './components/Nav';
import { CategoriesContainer } from './components/CategoriesContainer';
import { CartContainer } from './components/CartContainer';
import { ProductContainer } from './components/ProductContainer';
import { v4 as uuid } from 'uuid';
import React from 'react';

class App extends React.Component {
  state = {
    currentCategory: 0,
    currentCurrency: 0,
    cartItems: [],
    cartIsOpen: false,
    productPageIsOpen: false,
    product: [],
    toggleMiniCart: false,
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

  selectAttribute = id => {
    if (this.state.productPageIsOpen && !this.state.toggleMiniCart) {
      this.setState(state => ({
        ...state,
        product: {
          ...state.product,
          attributes: state.product.attributes.map(attribute => {
            return {
              ...attribute,
              items: attribute.items.map(item => {
                if (item.id === id) {
                  return {
                    ...item,
                    isSelected: !item.isSelected,
                  };
                } else {
                  return item;
                }
              }),
            };
          }),
        },
      }));
    } else if (this.state.toggleMiniCart || this.state.cartIsOpen) {
      this.setState(state => ({
        ...state,
        cartItems: state.cartItems.map(product => {
          return {
            ...product,
            attributes: product.attributes.map(attribute => {
              return {
                ...attribute,
                items: attribute.items.map(item => {
                  if (item.id === id) {
                    return {
                      ...item,
                      isSelected: !item.isSelected,
                    };
                  } else {
                    return item;
                  }
                }),
              };
            }),
          };
        }),
      }));
    }
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
    const newProduct = {
      ...product,
      attributes: product.attributes.map(attribute => {
        return {
          ...attribute,
          items: attribute.items.map(item => {
            return {
              ...item,
              isSelected: false,
              id: uuid(),
            };
          }),
        };
      }),
    };

    this.setState(state => ({
      ...state,
      product: { ...newProduct, quantity: 1 },
    }));
  };

  openMiniCart = () => {
    this.setState(state => ({
      ...state,
      toggleMiniCart: true,
    }));
  };

  closeMiniCart = () => {
    this.setState(state => ({
      ...state,
      toggleMiniCart: false,
    }));
  };

  render() {
    return (
      <div className="App">
        <Nav
          {...this.state}
          changeCategory={this.changeCategory}
          changeCurrency={this.changeCurrency}
          incrementQuantity={this.incrementQuantity}
          decrementQuantity={this.decrementQuantity}
          selectAttribute={this.selectAttribute}
          openCartPage={this.openCartPage}
          closeCartPage={this.closeCartPage}
          closeProductPage={this.closeProductPage}
          openMiniCart={this.openMiniCart}
          closeMiniCart={this.closeMiniCart}
        />
        {!this.state.cartIsOpen && !this.state.productPageIsOpen && (
          <CategoriesContainer
            {...this.state}
            addCartItems={this.addCartItems}
            openProductPage={this.openProductPage}
            addProduct={this.addProduct}
          />
        )}
        {this.state.cartIsOpen && !this.state.productPageIsOpen && (
          <CartContainer
            {...this.state}
            incrementQuantity={this.incrementQuantity}
            decrementQuantity={this.decrementQuantity}
            selectAttribute={this.selectAttribute}
          />
        )}
        {this.state.productPageIsOpen && (
          <ProductContainer
            {...this.state}
            selectAttribute={this.selectAttribute}
            addCartItems={() => this.addCartItems(this.state.product)}
          />
        )}
      </div>
    );
  }
}

export default App;
