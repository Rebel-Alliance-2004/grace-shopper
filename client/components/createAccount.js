import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/core';
import createAccountThunk from '../store/userActions';

const CreateAccount = ({ createAccount, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount(username, password);
    history.push('/products');
  }

  return (
    <Flex
      align='center'
      justify='center'
      direction='column'
      bg='white'
      minW='sm'
      maxW='md'
      p='1em'
    >
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="emailCA">Email address</FormLabel>
        <input
          type="email"
          id="emailCA"
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="usernameCA">Username</FormLabel>
        <input
          type="text"
          id="usernameCA"
          className='input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="passwordCA">Password</FormLabel>
        <input
          type="password"
          id="passwordCA"
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        type="submit"
        onClick={handleSubmit}
        size='lg'
        variantColor='green'
        mt='1em'
      >
        Create Account
      </Button>
    </Flex>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: (uname, pword) => dispatch(createAccountThunk(uname, pword))
  }
}

export default connect(null, mapDispatchToProps)(CreateAccount);
