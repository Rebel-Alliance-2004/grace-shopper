import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Stack, Heading, Button, Flex, Text, useToast, Input } from '@chakra-ui/core';
import { addToCartThunk } from '../store/actionCreators';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const toast = useToast();
  const handleAddToCart = (e, productId, qty) => {
    e.preventDefault();
    addToCart(productId, qty);
    toast({
      title: `${product.name}`,
      description: "added to cart",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: 'bottom'
    })
  };
  return (
    <Flex
      minW='sm'
      maxW='md'
      direction='Row'
      align='center'
      justify='space-between'
    >
      <Stack spacing="1">
        <Heading as="h2" size="lg">
          {product.name}
        </Heading>
        <Text color='#CBD5E0'>
          {product.description}
        </Text>
      </Stack>
      <Flex>
        <Text mr='1em'>
          ${+product.price * +quantity}
        </Text>
        <Input
          size='sm'
          width='3em'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          mr='1em'
        />
        <Button
          variantColor="green"
          size="xs"
          onClick={(e) => handleAddToCart(e, product.id, quantity)}
        >
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId, quantity = 1) => dispatch(addToCartThunk(productId, quantity)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
