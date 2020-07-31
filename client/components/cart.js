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
import { removeFromCartThunk } from '../store/actionCreators';

const Cart = ({ cart, remove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Stack
            spacing={0}
            bg='#2D3748'
            p='2em'
            paddingBottom='1em'
          >
            {
              !!cart.products && cart.products.map((product) => (
                <Flex
                  key={product.id}
                  align="center"
                  justify="space-between"
                  direction="row"
                  bg='#4A5568'
                  p='1em'
                  borderBottom='1px solid #2D3748'
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
            bg='#2D3748'
            p='2em'
            paddingTop='1em'
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
  remove: (id) => dispatch(removeFromCartThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
