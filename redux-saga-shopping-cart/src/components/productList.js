import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Product from "./product";

class ProductList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllProducts());
  }

  render() {
    const { products, loading } = this.props;

    return (
      <div>
        <h3>Products</h3>
        {loading && 'LOADING...'}
        {products.length > 0 && products.map(product => (
          <Product
            key={product.id}
            price={product.price}
            title={product.title}
            inventory={product.inventory}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })
  ).isRequired,
};

export default connect(
  state => ({ products: state.productsReducer.products || [], loading: state.productsReducer.loading })
)(ProductList)