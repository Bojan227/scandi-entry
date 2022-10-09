import React from 'react';

export class AttributeCard extends React.Component {
  render() {
    return (
      <div>
        <h2>{`${this.props.name.toUpperCase()}:`}</h2>
        <div className="attributes-buttons">
          {this.props.items.map((attribute, i) => {
            return (
              <div>
                {this.props.type === 'swatch' ? (
                  <button
                    onClick={() =>
                      this.props.addAttribute(attribute.displayValue)
                    }
                    key={attribute.value}
                    className={`${
                      !this.props.selectedAttributes.includes(
                        attribute.displayValue
                      )
                        ? ''
                        : 'swatch-selected'
                    } swatch-buttons`}
                    style={{ backgroundColor: `${attribute.value}` }}
                  ></button>
                ) : (
                  <button
                    key={attribute.value}
                    className={`${
                      !this.props.selectedAttributes.includes(
                        attribute.displayValue
                      )
                        ? ''
                        : 'selected'
                    }`}
                    onClick={() =>
                      this.props.addAttribute(attribute.displayValue)
                    }
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
