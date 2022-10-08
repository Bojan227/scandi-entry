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
    toggleCart: false,
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
                onClick={() => this.props.changeCategory(i)}
              >
                {category}
              </li>
            );
          })}
        </ul>
        <section>
          <img src={logo} alt="" />
        </section>
        <section className="cart-currency">
          <div className="currencies">
            <Query query={CURRENCIES_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading....';
                const { currencies } = data;

                return (
                  <div style={{ position: 'relative' }}>
                    <div
                      className="current-currency"
                      onClick={() =>
                        this.setState(state => ({
                          ...state,
                          toggleCurrency: !state.toggleCurrency,
                          toggleCart: false,
                        }))
                      }
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
                        display: `${this.state.toggleCart ? 'block' : 'none'}`,
                      }}
                    >
                      <CartOverlay
                        cartItems={this.props.cartItems}
                        currentCurrency={this.props.currentCurrency}
                      />
                    </div>
                  </div>
                );
              }}
            </Query>
          </div>
          <section
            onClick={() =>
              this.setState(state => ({
                ...state,
                toggleCart: !state.toggleCart,
                toggleCurrency: false,
              }))
            }
          >
            <img src={cart} alt="empty_cart" />
          </section>
        </section>
      </nav>
    );
  }
}
