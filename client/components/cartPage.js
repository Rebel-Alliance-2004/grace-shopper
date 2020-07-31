import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import { getCartThunk } from '../store/actionCreators';
import Cart from './cart';

const CartPage = ({ cart, getCart }) => {
  useEffect(() => {
    getCart();
  }, []);

  const shouldShowCart = () => {
    if (cart.products && cart.products.length) {
      return <Cart />
    }
    return <h2>No Items in Cart</h2>
  }

  return (
    <Flex
      width='100vw'
      minHeight='75vh'
      align='center'
      justify='center'
    >
      {
        shouldShowCart()
      }
    </Flex>
  );
}


const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCartThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);