import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../store/actionCreators';

const Login = ({ login, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .catch(console.log);
  };

  return (
    <form className="form login-form">
      <label className="label">
        Username:
        <input
          type="text"
          value={username}
          id="username"
          placeholder="rebelalliance"
          required
          onChange={
                        (e) => setUsername(e.target.value)
                    }
          className="input"
        />
      </label>
      <label className="label">
        Password:
        <input
          type="password"
          value={password}
          id="password"
          placeholder="usetheforce"
          required
          onChange={
                        (e) => setPassword(e.target.value)
                    }
          className="input"
        />
      </label>
      <button
        type="submit"
        onClick={handleSubmit}
        className="button is-primary"
      >
        Login
      </button>
      <p>{user && user.message}</p>
    </form>
  );
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginThunk(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
