import React from 'react';
import { CartProductCard } from './CartProductCard';

export class CartOverlay extends React.Component {
  render() {
    return (
      <div className="cart-overlay-container">
        <h1>My bag, 3 items</h1>
        {this.props.cartItems.length === 0 ? (
          <h1>No items</h1>
        ) : (
          this.props.cartItems.map(item => (
            <CartProductCard
              item={item}
              currentCurrency={this.props.currentCurrency}
            />
          ))
        )}
      </div>
    );
  }
}
