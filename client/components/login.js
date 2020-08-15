import React, { useState } from 'react';
import { Button, useToast, FormControl, FormLabel, Input, Flex } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { loginThunk } from '../store/userActions';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .catch((err) => {
        toast({
          title: "Login Failed",
          description: "Please enter a valid username and password.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  return (
    <Flex
      direction='column'
    >
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          type="text"
          id="username"
          bg='#E2E8F0'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          bg='#E2E8F0'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        type="submit"
        onClick={handleSubmit}
        size='lg'
        variantColor='green'
        m='1em'
      >
        Login
      </Button>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginThunk(username, password)),
});

export default connect(null, mapDispatchToProps)(Login);
