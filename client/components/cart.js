/* eslint-disable no-return-assign */
import React from 'react';
import { connect } from 'react-redux';
import {
  Stack,
  Heading,
  Flex,
  Button,
  Box,
} from '@chakra-ui/core';
import CartItem from './cartItem';
import { removeFromCartThunk, updateCartThunk } from '../store/cartActions';

const Cart = ({ cart, remove, update }) => {
  return (
    <>
      <Flex
        align='center'
        justify='center'
        mt='1em'
        minW={['sm', 'md', 'lg', 'xl']}
      >
        <Box
          w='100%'
        >
          <Stack
            spacing={0}
            bg='#2D3748'
            p={['0', '1em', '2em']}
            paddingBottom='1em'
          >
            {
              !!cart.products && cart.products.map((product) => (
                <CartItem update={update} remove={remove} product={product} key={product.id} />
              ))
            }
          </Stack>
          <Flex
            align='center'
            justify={['center', 'center', 'space-between']}
            bg='#2D3748'
            p='2em'
            paddingTop='1em'
          >
            <Button
              variantColor='green'
              size='lg'
              marginRight={['1em', '1em', '0']}
              onClick={() => window.location.pathname = `checkout/${cart.id}`}
            >
              Checkout
            </Button>
            <Heading
              as='h3'
              size='lg'
              color='#F7FAFC'
            >
              Total: ${cart.total}
            </Heading>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeFromCartThunk(id)),
  update: (id, quantity) => dispatch(updateCartThunk(id, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
