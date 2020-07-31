import axios from 'axios';
import { CREATE_ACCOUNT } from './actions';
import { loaded, loading } from './actionCreators';


const createAccount = (username) => {
  return {
    type: CREATE_ACCOUNT,
    username,
    loggedIn: true
  }
}

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