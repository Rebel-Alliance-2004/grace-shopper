import React, { useState, useEffect } from 'react';
import { Flex, Heading, Input, Button, IconButton, Box } from '@chakra-ui/core';

const CartItem = ({ product, remove, update }) => {
  const [quantity, setQuantity] = useState(product.productCart.quantity);
  const validateQuantity = () => {
    // if isDisabled === true, update button is disabled
    if (!Number(quantity)) return true;
    return quantity === product.productCart.quantity || !quantity;
  }
  useEffect(() => {
    if (quantity < 1) setQuantity(1);
  }, [quantity]);

  return (
    <Flex
      align="center"
      justify="space-between"
      direction={['column', 'column', 'row']}
      bg='#4A5568'
      p={['0 1em 1em', '0 1em 1em', '1em']}
      borderBottom='1px solid #2D3748'
    >
      <Box m={['1em', '1em', '0']}>
        <Heading as="h3" size='md' flexGrow='1'>
          {
            product.name
              .split(' ')
              .filter((_, i) => i < 3)
              .join(' ')
          }
        </Heading>
      </Box>
      <Flex
        alignItems='center'
        marginLeft='1em'
      >
        <IconButton
          variant='outline'
          variantColor='white'
          aria-label='increment quantity'
          icon='minus'
          size='sm'
          onClick={() => setQuantity(quantity - 1)}
        />
        <Input
          type='text'
          className='quantity'
          fontSize='xs'
          color='#000'
          size='sm'
          width='3em'
          p='0.25em'
          textAlign='center'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <IconButton
          variant='outline'
          variantColor='white'
          aria-label='increment quantity'
          icon='add'
          size='sm'
          mr='1em'
          onClick={() => setQuantity(quantity + 1)}
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
    </Flex>
  );
}

export default CartItem;