import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/core';

const Home = () => {
  return (
    <div className='homeHeroImg'>
      <Flex
        direction='column'
        color='#1a202c'
        p='2em'
      >
        <Heading as='h1' size='xl' className='heading'>World&apos;s Finest Smooth Jazz Instruments</Heading>
        <Heading as='h4' size='md' className='heading' m='1em 0 2em'>Keeping it smooth since &apos;72</Heading>
        <Link to='/products'>
          <Button bg='#718096' width='200px' padding='1em' fontSize='1.5em' className='heading' color='white'>Get Smooth</Button>
        </Link>
      </Flex>
    </div>
  )
};



export default Home;