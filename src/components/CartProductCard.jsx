import React from 'react';

export class CartProductCard extends React.Component {
  render() {
    return (
      <div className="cart-product-card">
        <section className="left-container">
          <h3>{this.props.item.name}</h3>
          <div className="prices">
            <h4>
              {
                this.props.item.prices[this.props.currentCurrency].currency
                  .symbol
              }
            </h4>
            <h4>{this.props.item.prices[this.props.currentCurrency].amount}</h4>
          </div>
          <div className="attributes">
            {console.log(this.props.item)}
            <h2>{this.props.item.attributes[0].name}</h2>
            {this.props.item.attributes[0].items.map(item => {
              return <button>{item.displayValue}</button>;
            })}
          </div>
        </section>
        <section className="buttons">
          <button>+</button>
          <h4>{this.props.item.quantity}</h4>
          <button></button>
        </section>
        <section>
          <img src="someimg" alt="" />
        </section>
      </div>
    );
  }
}
