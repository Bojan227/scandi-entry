import React from 'react';
import left from '../images/left-vector.png';
import right from '../images/right-vector.png';
import { CarouselSlider } from './CarouselSlider';
import { AttributeCard } from './AttributeCard';

export class CartProductCard extends React.Component {
  state = {
    currentImage: 0,
  };

  nextImage = () => {
    this.setState(state => ({
      ...state,
      currentImage:
        state.currentImage + 1 === this.props.item.gallery.length
          ? 0
          : state.currentImage + 1,
    }));
  };

  previousImage = () => {
    this.setState(state => ({
      ...state,
      currentImage:
        state.currentImage === 0
          ? this.props.item.gallery.length - 1
          : state.currentImage - 1,
    }));
  };

  render() {
    return (
      <div className="cart-product-card">
        <section className="left-container">
          <section>
            <h3>{this.props.item.brand}</h3>
            <h5>{this.props.item.name}</h5>
          </section>
          <div className="prices">
            <h4>
              {
                this.props.item.prices[this.props.currentCurrency].currency
                  .symbol
              }
            </h4>
            <h4>
              {(
                this.props.item.prices[this.props.currentCurrency].amount *
                this.props.item.quantity
              ).toFixed(2)}
            </h4>
          </div>
          <div className="attributes">
            {this.props.item.attributes.map((item, i) => {
              return (
                <AttributeCard
                  key={i}
                  {...item}
                  type={item.type}
                  selectedAttributes={this.props.selectedAttributes}
                  addAttribute={this.props.addAttribute}
                />
              );
            })}
          </div>
        </section>
        <section className="buttons">
          <button onClick={this.props.incrementQuantity}>+</button>
          <button>{this.props.item.quantity}</button>
          <button onClick={this.props.decrementQuantity}>-</button>
        </section>
        <section style={{ position: 'relative' }}>
          <div>
            {!this.props.cartIsOpen ? (
              <img
                style={{ width: '120px', height: '180px' }}
                src={this.props.item.gallery[0]}
                alt=""
              />
            ) : (
              <CarouselSlider
                currentImage={this.state.currentImage}
                gallery={this.props.item.gallery}
              />
            )}
          </div>
          <div onClick={() => this.previousImage()} className="left-caret">
            <img src={left} alt="left" />
          </div>
          <div onClick={() => this.nextImage()} className="right-caret">
            <img src={right} alt="right" />
          </div>
        </section>
      </div>
    );
  }
}
