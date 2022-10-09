import React from 'react';
import { Query } from '@apollo/client/react/components/Query';
import { ProductCard } from './ProductCard';
import { gql } from '@apollo/client';

const CATEGORIES_QUERY = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        category
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export class CategoriesContainer extends React.Component {
  render() {
    return (
      <div>
        <Query query={CATEGORIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading....';
            const { name, products } =
              data.categories[this.props.currentCategory + 1];

            return (
              <div className={`category-container `}>
                <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                <div className="products">
                  {products.map((product, i) => {
                    return (
                      <ProductCard
                        key={i}
                        currentCurrency={this.props.currentCurrency}
                        {...product}
                        addItem={() => this.props.addCartItems(product)}
                        openProductPage={this.props.openProductPage}
                        addProduct={() => this.props.addProduct(product)}
                      />
                    );
                  })}
                </div>
                ;
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
