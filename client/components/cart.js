/* eslint-disable no-return-assign */
import React from 'react';
import { connect } from 'react-redux';
import {
  Stack,
  Heading,
  Flex,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core';
import CartItem from './cartItem';
import { removeFromCartThunk, updateCartThunk } from '../store/cartActions';

const Cart = ({ cart, remove, update }) => {
  const { isOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        align='center'
        justify='center'
        mt='1em'
        minW='xl'
      >
        <Box
          w='100%'
        >
          <Stack
            spacing={0}
            bg='#2D3748'
            p='2em'
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
            justify='space-between'
            bg='#2D3748'
            p='2em'
            paddingTop='1em'
          >
            <Button
              variantColor='green'
              size='lg'
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          color='black'
        >
          <ModalHeader>Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Checkout text here
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={() => window.location.pathname = '/checkout'}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeFromCartThunk(id)),
  update: (id, quantity) => dispatch(updateCartThunk(id, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
