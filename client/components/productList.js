import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from './loading';
import ProductCard from './productCard';
import { getProductsThunk } from '../store/actionCreators';

const ProductList = ({ loading, products, getProducts }) => {
  // this works like componentDidMount
  useEffect(() => {
    getProducts();
  }, []);

  const showProductsList = () => {
    return products.length
      ? products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))
      : <p>Error fetching products</p>
  }
  return (
    <div>
      {
        loading ? <Loading /> : showProductsList()
      }
    </div>
  );
};

const mapStateToProps = ({ loading, products }) => ({ loading, products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
