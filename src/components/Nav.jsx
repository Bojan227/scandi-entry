import React from 'react';
import logo from '../images/logo.png';
import cart from '../images/empty_cart.png';
import caret from '../images/vector.png';
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

export class Nav extends React.Component {
  state = {
    currentCurrency: 0,
    currentCategory: 0,
    toggleCurrency: false,
  };

  render() {
    return (
      <nav className="main-navigation">
        <ul className="categories">
          <li
            style={{
              borderBottom: `${
                this.state.currentCategory === 0 ? '1px solid #5ECE7B' : ''
              }`,
            }}
          >
            WOMEN
          </li>
          <li
            style={{
              borderBottom: `${
                this.state.currentCategory === 1 ? '1px solid #5ECE7B' : ''
              }`,
            }}
          >
            MEN
          </li>
          <li
            style={{
              borderBottom: `${
                this.state.currentCategory === 2 ? '1px solid #5ECE7B' : ''
              }`,
            }}
          >
            KIDS
          </li>
        </ul>
        <section>
          <img src={logo} alt="" />
        </section>
        <section className="cart-currency">
          <div className="currencies">
            <Query query={CURRENCIES_QUERY}>
              {({ loading, error, data }) => {
                console.log(data);
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
                        }))
                      }
                    >
                      <h1>{currencies[this.state.currentCurrency].symbol}</h1>
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
                              this.setState(state => ({
                                ...state,
                                currentCurrency: i,
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
                  </div>
                );
              }}
            </Query>
          </div>
          <img src={cart} alt="empty_cart" />
        </section>
      </nav>
    );
  }
}
