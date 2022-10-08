import React from 'react';
import circleIcon from '../images/circle_icon.png';

export class ProductCard extends React.Component {
  state = {
    showBuyIcon: false,
  };

  toggleBuyIcon = () => {
    this.setState(state => ({
      showBuyIcon: !state.showBuyIcon,
    }));
  };

  render() {
    return (
      <div
        onMouseEnter={this.toggleBuyIcon}
        onMouseLeave={this.toggleBuyIcon}
        className="product-card"
      >
        <div className="main-img" style={{ position: 'relative' }}>
          <img src={this.props.gallery[0]} alt="img" />
          <img
            onClick={this.props.onClick}
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              bottom: '-20px',
              right: '20px',
              display: `${this.state.showBuyIcon ? 'block' : 'none'}`,
            }}
            src={circleIcon}
            alt="addItem"
          />
        </div>
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
