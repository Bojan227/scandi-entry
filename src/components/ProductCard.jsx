import React from 'react';

export class ProductCard extends React.Component {
  render() {
    return (
      <div className="product-card">
        <img src={this.props.gallery[0]} alt="img" />
        <h3>{this.props.name}</h3>
        <div className="prices">
          <h4>
            {this.props.prices[this.props.currentCurrency].currency.symbol}
          </h4>
          <h4>{this.props.prices[this.props.currentCurrency].amount}</h4>
        </div>
      </div>
    );
  }
}
