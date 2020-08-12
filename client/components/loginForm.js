import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex } from "@chakra-ui/core";
import Login from './login';
import Logout from './logout';
import Loading from './loading';
import { whoami } from '../store/userActions';

const LoginForm = ({ user, whoAmI, loading }) => {
  useEffect(() => {
    whoAmI();
  }, []);

  const showLoginOrLogout = () => {
    return user.username ? <Logout /> : <Login />;
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
      {
        loading ? <Loading /> : showLoginOrLogout()
      }
    </Flex>
  );
};

const mapStateToProps = ({ user, loading }) => ({ user, loading });
const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
