import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Input
} from '@chakra-ui/core';
import createAccountThunk from '../store/userActions';

const CreateAccount = ({ createAccount, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const toast = useToast();

  const validateEmail = () => {
    return email.length && !/^[a-zA-Z0-9_.]+@[a-zA-Z0-9-.]+\.[a-z]{2,}$/.test(email);
  }

  const validateUsername = () => {
    return username.length && !/^[a-zA-Z0-9_.]{6,16}$/.test(username);
  }

  const assessPasswordStrength = () => {
    const strength = [];

    if (/[a-z]/.test(password)) strength.push('lowercase');
    if (/[A-Z]/.test(password)) strength.push('uppercase');
    if (/[0-9]/.test(password)) strength.push('number');
    if (/[!@#$%^&*()_-]/.test(password)) strength.push('special');
    if (password.length >= 8) strength.push('8 chars');

    setPasswordStrength(strength.length);
  }

  useEffect(() => assessPasswordStrength(), [password])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUsername() && !validateEmail() && passwordStrength >= 3) {
      createAccount(username, password, email)
        .then(() => {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          history.push('/products');
        })
        .catch(console.log)
    } else {
      toast({
        title: "Invalid",
        description: "Please enter a valid email, username, and password.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
    }
    console.log(email);
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
        <Input
          type="email"
          id="emailCA"
          bg='#E2E8F0'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={validateEmail()}
        />
      </FormControl>
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="usernameCA">Username</FormLabel>
        <Input
          type="text"
          id="usernameCA"
          bg='#E2E8F0'
          value={username}
          isInvalid={validateUsername()}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl
        color='black'
        isRequired
      >
        <FormLabel htmlFor="passwordCA">Password</FormLabel>
        <Input
          type="password"
          id="passwordCA"
          bg='#E2E8F0'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={password.length && passwordStrength < 3 && password.length < 8}
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
    createAccount: (uname, pword, eml) => dispatch(createAccountThunk(uname, pword, eml))
  }
}

export default connect(null, mapDispatchToProps)(CreateAccount);
