import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store/reducer';
import { getProductsThunk } from '../store/actionCreators';


class AdminProducts extends Component{
  constructor(){
    super()

    this.state={
      products: []
    }
  }

  async componentDidMount(){
    await this.props.getProducts();
    this.setState({products: store.getState().products})
  }

  render(){
    const { products } = this.state;
    
    return(
      <div>
        <h1>Select the product you would like to edit.</h1>
        <div>
          {products.map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/product/${product.id}`} className='title tag is-white is-large'>{product.name}</Link>
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