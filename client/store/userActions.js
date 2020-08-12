import axios from 'axios';
import { userTypes } from './actions';
import { loaded, loading } from './actionCreators';

const login = (username, role) => ({
  type: userTypes.LOGIN,
  username,
  role,
});
const logout = () => ({
  type: userTypes.LOGOUT,
});

const loginFail = (message) => ({
  type: userTypes.LOGIN_FAIL,
  message,
});

const createAccount = (username) => {
  return {
    type: userTypes.CREATE_ACCOUNT,
    username,
    loggedIn: true
  }
};

export const loginThunk = (username, password) => (dispatch) => {
  dispatch(loading());
  return axios
    .post('/user/login', { username, password })
    .then((res) => {
      dispatch(login(username, res.data.role));
      dispatch(loaded());
    })
    .catch((e) => {
      dispatch(loginFail('Incorrect username or password'));
      dispatch(loaded());
      throw e;
    });
};

export const whoami = () => (dispatch) => {
  dispatch(loading());
  return axios.get('/user/whoami').then(({ data }) => {
    if (data.loggedIn) {
      dispatch(login(data.username, data.role));
    } else {
      dispatch(logout());
    }
    dispatch(loaded());
  });
};

export const logoutThunk = () => (dispatch) => {
  dispatch(loading());
  return axios
    .get('/user/logout')
    .then(() => {
      dispatch(logout());
      dispatch(loaded());
    })
    .catch((e) => {
      dispatch(loaded());
      console.log(e);
    });
};


const createAccountThunk = (username, password, email) => {
  return (dispatch) => {
    dispatch(loading());
    return axios.post('/user/create', { username, password, email, role: 'customer' })
      .then(({ data }) => {
        dispatch(createAccount(data.username));
        dispatch(loaded());
      })
      .catch(() => {
        dispatch(loaded());
        // console.error(e);
      })
  }
}

export default createAccountThunk;