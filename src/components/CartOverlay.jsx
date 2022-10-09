import React from 'react';
import { CartProductCard } from './CartProductCard';

export class CartOverlay extends React.Component {
  render() {
    return (
      <div className="cart-overlay-container">
        <h1>
          <span>My bag,</span> {`${this.props.cartItems.length}`}{' '}
          {`${this.props.cartItems.length === 1 ? 'item' : 'items'}`}
        </h1>
        <div>
          {this.props.cartItems.length === 0 ? (
            <h1>No items</h1>
          ) : (
            this.props.cartItems.map(item => (
              <CartProductCard
                key={item.id}
                item={item}
                currentCurrency={this.props.currentCurrency}
                incrementQuantity={() => this.props.incrementQuantity(item.id)}
                decrementQuantity={() => this.props.decrementQuantity(item.id)}
                selectedAttributes={this.props.selectedAttributes}
                addAttribute={this.props.addAttribute}
              />
            ))
          )}
        </div>
        {this.props.cartItems.length ? (
          <section className="total-section">
            <h1>Total</h1>
            <h3>
              {this.props.cartItems.length
                ? this.props.cartItems[0].prices[this.props.currentCurrency]
                    .currency.symbol
                : ''}
              <span>
                {this.props.cartItems
                  .reduce(
                    (sum, item) =>
                      (sum +=
                        item.prices[this.props.currentCurrency].amount *
                        item.quantity),
                    0
                  )
                  .toFixed(2)}
              </span>
            </h3>
          </section>
        ) : (
          ''
        )}
        <section className="footer-section-cart">
          <button
            onClick={() => {
              this.props.openCartPage();
              this.props.closeMiniCart();
              this.props.closeProductPage();
            }}
          >
            VIEW BAG
          </button>
          <button>CHECK OUT</button>
        </section>
      </div>
    );
  }
}
