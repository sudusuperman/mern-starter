import callAuth from '../../util/authCaller';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

// Export Actions
export function addAccessToken(token) {
  return {
    type: ADD_USER,
    token: token,
  };
}

export function removeAccessToken() {
  return {
    type: REMOVE_USER,
  };
}

export function registerUserRequest(username, password, profile) {
  return (dispatch) => {
    return callAuth('register', 'post', {
        username: username,
        password: password,
        profile: profile,
    }).then(res => {
      dispatch(addAccessToken(res.token));
      return res.error;
    });
  };
}

export function loginUserRequest(username, password) {
  return (dispatch) => {
    return callAuth('login', 'post', {
      username: username,
      password: password,
    }).then(res => {
      dispatch(addAccessToken(res.token))
      return res.error;
    });
  };
}

export function logoutUserRequest(token) {
  return (dispatch) => {
    return callAuth('logout', 'post', {
      token: token,
    }).then(res => {
      dispatch(removeAccessToken());
      return res.error;
    });
  };
}
