import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store/reducer';
import { getProductsThunk } from '../store/actionCreators';


class AdminProducts extends Component{
  constructor(){
    super()

    this.state={
      products: store.getState().products
    }
  }

  componentDidMount(){
    this.props.getProducts()
  }

  render(){
    const { products } = this.state.products;
    console.log(products)
    return(
      <div>
        <h1>Welcome to the Admin Console!</h1>
        <div>
          {products.map(product => {
              return (
                <div key={products.id}>
                  <Link to={`/admin/product/${product.id}`} className='title tag is-white is-large'>{product.name}</Link>
                </div>
              ) 
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);