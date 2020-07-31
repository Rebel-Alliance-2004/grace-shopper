import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsThunk } from '../store/actionCreators';
import AddProductForm from './addProductForm';

class AdminProducts extends Component{
  constructor(){
    super()

    this.state={
      products: []
    }
  }

  async componentDidMount(){
    await this.props.getProducts();
    this.setState({products: this.props.products})
  }

  render(){
    const { products } = this.state;
    
    return(
      <div>
        <AddProductForm />
        <h1>Select the product you would like to edit.</h1>
        <div>
          {products.map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/adminproduct/${product.id}`} className='title tag is-white is-large'>{product.name}</Link>
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