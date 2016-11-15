import { ADD_USER, REMOVE_USER } from './AuthActions';

// Initial State
const initialState = { token: false };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER : {
      localStorage.setItem('token', JSON.stringify(action.token));
      return {
        token: false,
      };
    }

    case REMOVE_USER :
      localStorage.setItem('token', JSON.stringify(false));
      return {
        token: false,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getToken = state => {
  try {
    return JSON.parse(localStorage.getItem('token'));
  } catch(e) {
    console.log('localStorage not ready [to be deleted]');
    return false;
  }
}

// Export Reducer
export default AuthReducer;
