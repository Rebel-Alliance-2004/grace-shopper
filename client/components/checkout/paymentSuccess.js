import React, { Component } from 'react';
import { Flex, Heading } from '@chakra-ui/core';

class PaymentSuccess extends Component{
  render(){
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
        >
          <Heading as='h2' size='xl' className='heading' color='white'>Thank you for your puchase!!!</Heading>
          <Flex
            direction='column'
            color='white'
          />
          <Heading as='h4' size='md' color='white' m='1em'>Please check your email for your confirmation number.</Heading>
        </Flex>
      </Flex>
    )
  }
}

export default PaymentSuccess