import React from 'react';
import parse from 'html-react-parser';
import { AttributeCard } from './AttributeCard';

export class ProductContainer extends React.Component {
  state = {
    currentImage: 0,
  };

  render() {
    return (
      <div className="product-container">
        <div className="images-container">
          {this.props.product.gallery.map((url, i) => {
            return (
              <div
                key={i}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.setState(state => ({
                    ...state,
                    currentImage: i,
                  }));
                }}
              >
                <img
                  src={url}
                  alt="img"
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
            );
          })}
        </div>
        <div className="main-img-container">
          <img
            src={this.props.product.gallery[this.state.currentImage]}
            alt="img"
            style={{ width: '600px', height: '600px' }}
          />
        </div>
        <div className="product-info">
          <section>
            <h1>{this.props.product.brand}</h1>
            <h3>{this.props.product.name}</h3>
          </section>
          <section className="attributes-container">
            {this.props.product.attributes.map((item, i) => {
              return (
                <AttributeCard
                  key={i}
                  {...item}
                  type={item.type}
                  selectAttribute={this.props.selectAttribute}
                />
              );
            })}
          </section>
          <section className="price-container">
            <h2>PRICE:</h2>
            <h3>
              {
                this.props.product.prices[this.props.currentCurrency].currency
                  .symbol
              }
              <span>
                {this.props.product.prices[this.props.currentCurrency].amount}
              </span>
            </h3>
          </section>
          <button onClick={this.props.addCartItems}>ADD TO CART</button>
          <section className="description">
            {parse(this.props.product.description)}
          </section>
        </div>
      </div>
    );
  }
}
