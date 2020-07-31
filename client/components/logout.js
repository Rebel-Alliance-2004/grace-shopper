import React from 'react';
import { connect } from 'react-redux';
import { Button } from "@chakra-ui/core";
import { logoutThunk } from '../store/actionCreators';

const Logout = ({ user, logout }) => (
  <div className='form'>
    <h2>
      Welcome
      {user.username}
      !
    </h2>
    <Button
      onClick={logout}
      className='button is-danger'
    >
      Logout
    </Button>
  </div>
);

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
