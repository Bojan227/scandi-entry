import React from 'react';
import { CartProductCard } from './CartProductCard';

export class CartContainer extends React.Component {
  render() {
    return (
      <div className="cart-page">
        {this.props.cartItems.length === 0 ? (
          <h1>No items</h1>
        ) : (
          <>
            <h1>Cart</h1>
            <div>
              {this.props.cartItems.map(item => (
                <CartProductCard
                  key={item.id}
                  item={item}
                  currentCurrency={this.props.currentCurrency}
                  incrementQuantity={() =>
                    this.props.incrementQuantity(item.id)
                  }
                  decrementQuantity={() =>
                    this.props.decrementQuantity(item.id)
                  }
                  selectAttribute={this.props.selectAttribute}
                  cartIsOpen={this.props.cartIsOpen}
                />
              ))}
            </div>
            <div className="footer-cart">
              <h2>
                Tax 21%:{' '}
                <span className="tax-amount">
                  {`${
                    this.props.cartItems[0].prices[this.props.currentCurrency]
                      .currency.symbol
                  }${(
                    (this.props.cartItems.reduce(
                      (sum, item) =>
                        (sum +=
                          item.prices[this.props.currentCurrency].amount *
                          item.quantity),
                      0
                    ) *
                      21) /
                    100
                  ).toFixed(2)}`}
                </span>
              </h2>
              <h2>
                Quantity:
                <span className="quantity-amount">
                  {this.props.cartItems.length}
                </span>
              </h2>

              <h2>
                Total:
                <span className="total-amount">
                  {`${
                    this.props.cartItems[0].prices[this.props.currentCurrency]
                      .currency.symbol
                  }${this.props.cartItems
                    .reduce(
                      (sum, item) =>
                        (sum +=
                          item.prices[this.props.currentCurrency].amount *
                          item.quantity),
                      0
                    )
                    .toFixed(2)}`}
                </span>
              </h2>
              <button>ORDER</button>
            </div>
          </>
        )}
      </div>
    );
  }
}
