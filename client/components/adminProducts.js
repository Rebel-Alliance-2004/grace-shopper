import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/core';
import { getProductsThunk } from '../store/productThunks';
import AddProductForm from './addProductForm';


class AdminProducts extends Component {
  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <Flex
        p='2em'
        direction='column'
        align='center'
        textAlign='center'
      >
        <Flex
          direction='column'
          bg='#2D3748'
          p='1em'
          w='xl'
          m='1em'
        >
          <Heading as='h2' size='xl' className='heading' color='white'>Products</Heading>
          <AddProductForm />
          <h4 className='subtitle' style={{ color: 'white' }}>
            Select the product you would like to edit.
          </h4>
          <Flex
            bg='#4A5568'
            direction='column'
            color='white'
            p='1em'
            m='0 1em'
          >
            {
              products.map(product => {
                return (
                  <div key={product.id}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </div>
                )
              })
            }
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProductsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);