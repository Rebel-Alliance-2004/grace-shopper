import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Flex } from '@chakra-ui/core';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: make this work
    console.log(email, password, username)
  }

  return (
    <Flex
      align='center'
      justify='center'
      bg='white'
      minW='sm'
      maxW='md'
      p='1em'
    >
      <form className='form' id='createAccount'>
        <label
          htmlFor='email'
          className='label'
        >
          Email:
          <input
            type="text"
            value={email}
            id="email"
            placeholder="email"
            onChange={
              (e) => setEmail(e.target.value)
            }
            className='input'
          />
        </label>
        <label
          htmlFor='username'
          className='label'
        >
          Username:
          <input
            type="text"
            value={username}
            id="username"
            placeholder="username"
            onChange={
              (e) => setUsername(e.target.value)
            }
            className='input'
          />
        </label>
        <label
          htmlFor='username'
          className='label'
        >
          Password:
          <input
            type="password"
            value={password}
            id="password"
            placeholder="password"
            required
            onChange={
              (e) => setPassword(e.target.value)
            }
            className='input'
          />
        </label>
        <Button
          type="submit"
          onClick={handleSubmit}
          size='lg'
          variantColor='green'
        >
          Create Account
        </Button>
      </form>
    </Flex>
  );
}

export default connect(null)(CreateAccount);