import React from 'react';

export class AttributeCard extends React.Component {
  render() {
    return (
      <div>
        <h2>{`${this.props.name.toUpperCase()}:`}</h2>
        <div className="attributes-buttons">
          {this.props.items.map((attribute, i) => {
            return (
              <div key={i}>
                {this.props.type === 'swatch' ? (
                  <button
                    onClick={() => this.props.selectAttribute(attribute.id)}
                    className={`${
                      !attribute.isSelected ? '' : 'swatch-selected'
                    } swatch-buttons`}
                    style={{ backgroundColor: `${attribute.value}` }}
                  ></button>
                ) : (
                  <button
                    className={`${!attribute.isSelected ? '' : 'selected'}`}
                    onClick={() => this.props.selectAttribute(attribute.id)}
                  >
                    {attribute.displayValue}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
