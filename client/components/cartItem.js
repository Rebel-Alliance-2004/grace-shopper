import React, { useState } from 'react';
import { Flex, Heading, Input, Button } from '@chakra-ui/core';

const CartItem = ({ product, remove, update }) => {
  const [quantity, setQuantity] = useState(product.productCart.quantity);
  const validateQuantity = () => {
    // if isDisabled === true, update button is disabled
    if (!Number(quantity)) return true;
    return quantity === product.productCart.quantity || !quantity;
  }
  return (
    <Flex
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
      <Input
        type='text'
        className='quantity'
        fontSize='xs'
        color='#000'
        mr='1em'
        size='sm'
        width='3em'
        p='0.25em'
        textAlign='center'
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <Button
        variantColor='gray'
        color='black'
        size='xs'
        onClick={() => { update(product.id, quantity) }}
        isDisabled={validateQuantity()}
        mr='1em'
      >
        Update
      </Button>
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
  );
}

export default CartItem;