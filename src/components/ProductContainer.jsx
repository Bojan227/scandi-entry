import React from 'react';

export class ProductContainer extends React.Component {
  render() {
    return (
      <div className="product-container">
        <div className="images-container"></div>
        <div className="main-img-container"></div>
        <div className="product-info">
          <section>
            <h1>Brand</h1>
            <h3>{this.props.name}</h3>
          </section>
          <section className="attributes-container"></section>
          <section className="price-container">
            <h1>PRICE:</h1>
            <h3>50</h3>
          </section>
          <button>ADD TO CART</button>
          <section className="description">
            <p>sajhashduhasdhuahdusahdhsahdiashdhasdhisa</p>
          </section>
        </div>
      </div>
    );
  }
}
