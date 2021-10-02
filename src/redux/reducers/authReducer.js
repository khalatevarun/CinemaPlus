import * as TYPES from '../../constants/actionTypes';

const initialState = {
  user: { name: null, id: null },
  isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        user: '',
        isLoggedIn: true,
        name: '',
      };

    case TYPES.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        name: null,
      };

    default:
      return state;
  }
}
