import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Loading, ProductCard } from './index';
import { getProductsThunk } from '../store/actionCreators';

const ProductList = ({ loading, products, getProducts }) => {
  // this works like componentDidMount
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {
                loading ? <Loading /> : products.length ? products.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                )) : <p>Error fetching products</p>
            }
    </div>
  );
};

const mapStateToProps = ({ loading, products }) => ({ loading, products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
