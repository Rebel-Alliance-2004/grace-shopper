/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Flex, Heading, Input } from '@chakra-ui/core';
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
      <Flex
        direction='column'
        align='center'
        w='100vw'
        p='1em'
      >
        <Flex
          m='2em'
          direction='column'
          align='center'
          textAlign='center'
          bg='#2D3748'
          w='xl'
          p='1em'
        >
          <Heading
            as='h2'
            className='heading'
          >
            Edit {name}
          </Heading>
          {
            name && (
              <div>
                <label className='label' style={{ color: 'white' }}>
                  Name:
                  <Input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} color='black' bg='#E2E8F0' />
                </label>
                <label className='label' style={{ color: 'white' }}>
                  Price:
                  <Input value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} color='black' bg='#E2E8F0' />
                </label>
                <label className='label' style={{ color: 'white' }}>
                  Description:
                  <Input value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} color='black' bg='#E2E8F0' />
                </label>
                <Button onClick={() => this.props.updateProduct(id, name, price, description, history)} variantColor='green' size='sm' m='1em'>Save Changes</Button>
                <Button onClick={() => this.props.deleteProduct(id, history)} variantColor='red' size='sm' m='1em'>Delete Product</Button>
              </div>
            )
          }
        </Flex>
      </Flex>
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