import React from 'react';
import logo from '../images/logo.png';
import cart from '../images/empty_cart.png';
import caret from '../images/vector.png';
import { CartOverlay } from './CartOverlay';
import { Query } from '@apollo/client/react/components/Query';
import { gql } from '@apollo/client';

const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

const categoriesData = ['CLOTHES', 'TECH'];

export class Nav extends React.Component {
  state = {
    toggleCurrency: false,
  };

  render() {
    return (
      <nav className="main-navigation">
        <ul className="categories">
          {categoriesData.map((category, i) => {
            return (
              <li
                key={i}
                style={{
                  borderBottom: `${
                    this.props.currentCategory === i ? '1px solid #5ECE7B' : ''
                  }`,
                }}
                onClick={() => {
                  this.props.changeCategory(i);
                  this.props.closeCartPage();
                  this.props.closeProductPage();
                }}
              >
                {category}
              </li>
            );
          })}
        </ul>
        <section
          onClick={() => {
            this.props.closeCartPage();
            this.props.closeProductPage();
          }}
        >
          <img src={logo} alt="" />
        </section>
        <section className="cart-currency">
          <div className="currencies">
            <Query query={CURRENCIES_QUERY}>
              {({ loading, data }) => {
                if (loading) return 'Loading....';
                const { currencies } = data;

                return (
                  <div style={{ position: 'relative' }}>
                    <div
                      className="current-currency"
                      onClick={() => {
                        this.props.closeMiniCart();
                        this.setState(state => ({
                          ...state,
                          toggleCurrency: !state.toggleCurrency,
                        }));
                      }}
                    >
                      <h1>{currencies[this.props.currentCurrency].symbol}</h1>
                      <img src={caret} alt="caret" />
                    </div>
                    <ul
                      className="dropdown-currencies"
                      style={{
                        display: `${this.state.toggleCurrency ? 'block' : ''}`,
                      }}
                    >
                      {currencies.map(({ label, symbol }, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              this.props.changeCurrency(i);
                              this.setState(state => ({
                                ...state,
                                toggleCurrency: !state.toggleCurrency,
                              }));
                            }}
                            className="currency-options"
                          >
                            <li>{symbol}</li>
                            <li>{label}</li>
                          </div>
                        );
                      })}
                    </ul>
                    <div
                      className="cart-overlay-dropdown"
                      style={{
                        display: `${
                          this.props.toggleMiniCart ? 'block' : 'none'
                        }`,
                      }}
                    >
                      <CartOverlay
                        cartItems={this.props.cartItems}
                        currentCurrency={this.props.currentCurrency}
                        incrementQuantity={this.props.incrementQuantity}
                        decrementQuantity={this.props.decrementQuantity}
                        selectAttribute={this.props.selectAttribute}
                        openCartPage={this.props.openCartPage}
                        closeMiniCart={this.props.closeMiniCart}
                        closeProductPage={this.props.closeProductPage}
                      />
                    </div>
                  </div>
                );
              }}
            </Query>
          </div>
          <section
            onClick={() => {
              this.setState(state => ({
                ...state,

                toggleCurrency: false,
              }));
              this.props.toggleMiniCart
                ? this.props.closeMiniCart()
                : this.props.openMiniCart();
            }}
            className="empty_cart"
          >
            <img src={cart} alt="empty_cart" />
            {this.props.cartItems.length ? (
              <div className="info-cart">{this.props.cartItems.length}</div>
            ) : (
              ''
            )}
          </section>
        </section>
      </nav>
    );
  }
}
