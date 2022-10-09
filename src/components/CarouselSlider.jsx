import React from 'react';

export class CarouselSlider extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.gallery[this.props.currentImage]}
          style={{ width: '200px', height: '280px' }}
          alt="img"
        />
      </div>
    );
  }
}
