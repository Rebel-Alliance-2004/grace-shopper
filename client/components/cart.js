import React, { useEffect } from 'react';
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
import { getCartThunk, removeFromCartThunk } from '../store/actionCreators';

const Cart = ({ cart, getCart, remove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Flex
        align='center'
        justify='center'
        mt='1em'
      >
        <Box
          maxW='lg'
          minW='md'
        >
          <Stack spacing={1}>
            {
              !!cart.products && cart.products.map((product) => (
                <Flex
                  key={product.id}
                  align="center"
                  justify="space-between"
                  direction="row"
                  bg='#4A5568'
                  p='1em'
                >
                  <Heading as="h3" size="md" flexGrow='1'>
                    {product.name}
                  </Heading>
                  <Text
                    color='#A0AEC0'
                    fontSize='xs'
                    mr='1em'
                  >
                    Qty: {product.productCart.quantity}
                  </Text>
                  <Heading as="h2" size="sm" mr='1em'>
                    ${+product.price * +product.productCart.quantity}
                  </Heading>
                  <Button
                    variantColor='red'
                    size='xs'
                    onClick={() => remove(product.id)}
                  >
                    Remove
                  </Button>
                </Flex>
              ))
            }
          </Stack>
          <Flex
            align='center'
            justify='space-between'
            mt='0.5em'
            bg='#2D3748'
            p='1em'
          >
            <Button
              variantColor='green'
              size='lg'
              onClick={onOpen}
            >
              Checkout
            </Button>
            <Heading
              as='h3'
              size='m'
              color='#F7FAFC'
            >
              Total: ${cart.total}
            </Heading>
          </Flex>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Checkout text here
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
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
  getCart: () => dispatch(getCartThunk()),
  remove: (id) => dispatch(removeFromCartThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
