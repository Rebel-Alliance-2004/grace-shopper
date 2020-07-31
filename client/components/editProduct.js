/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@chakra-ui/core';
import { updateProductThunk, deleteProductThunk, getProductsThunk } from '../store/productThunks';

class EditProduct extends Component {
  constructor() {
    super()

    this.state = {
      id: '',
      name: '',
      price: '',
      description: ''
    }
  }

  async componentDidMount() {
    await this.props.getProducts();
    const { products } = this.props;
    const productId = this.props.match.params.id;
    const product = await products.find(prod => prod.id === productId);
    this.setState({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description
    })
  }

  render() {
    const { id, name, price, description } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1>Edit {name}</h1>
        <div>
          {
            name && (
              <div>
                <label>
                  Name:
                  <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} className='input' />
                </label>
                <label>
                  Price:
                  <input value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} className='input' />
                </label>
                <label>
                  Description:
                  <input value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} className='input' />
                </label>
                <Button onClick={() => this.props.updateProduct(id, name, price, description, history)}>Save Changes</Button>
                <Button onClick={() => this.props.deleteProduct(id, history)}>Delete Product</Button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk()),
  updateProduct: (id, name, price, description, history) => dispatch(updateProductThunk(id, name, price, description, history)),
  deleteProduct: (id, history) => dispatch(deleteProductThunk(id, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);