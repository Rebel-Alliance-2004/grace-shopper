import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Button, Heading } from '@chakra-ui/core';

class AdminConsole extends Component {
  render() {
    return (
      <Flex
        w='100vw'
        justify='center'
      >
        <Flex
          w={['100%', '90%', '600px', '800px']}
          m='1em'
          direction='column'
          justifyContent='space-between'
          p='1em'
        >
          <Heading
            as='h2'
            size='lg'
            className='heading'
            textAlign='center'
            marginBottom='1em'
          >
            Welcome to the Admin Console!
          </Heading>
          <Heading
            as='h4'
            size='md'
            textAlign='center'
            marginBottom='1em'
          >
            Please select the element you would like to modify:
          </Heading>
          <Flex
            w='100%'
            justify='center'
          >
            <Link to="/admin/categories">
              <Button
                variantColor='green'
                size='lg'
                m='0 1em'
              >
                Categories
              </Button>
            </Link>

            <Link to="/admin/Products">
              <Button
                variantColor='green'
                size='lg'
                m='0 1em'
              >
                Products
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AdminConsole);