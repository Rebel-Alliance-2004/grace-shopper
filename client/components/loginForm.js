import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Login, Logout, Loading } from './index';
import { whoami } from '../store/actionCreators';

const LoginForm = ({ user, whoami, loading }) => {
  useEffect(() => {
    whoami();
  }, []);

  return (
    <div className="box login-box">
      {
                loading ? <Loading /> : user.username ? <Logout /> : <Login />
            }
    </div>
  );
};

const mapStateToProps = ({ user, loading }) => ({ user, loading });
const mapDispatchToProps = (dispatch) => ({
  whoami: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
