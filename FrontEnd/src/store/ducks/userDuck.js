const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const HAS_ERROR = "HAS_ERROR"

const LOGOUT_USER = "LOGOUT_USER"
const LOGIN_LG = "LOGIN_LG"

const BASE_ENDPOINT = 'api/User';
const initialValues = {
  user: [],
  isLogin:false,
  loading: false,
  hasError: false,
  hasErrorMessage:"",
}

const users = (state = initialValues, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem('user', JSON.stringify({
        user: action.payload.data
    }))
      return {
        ...state,
        loading: false,
        isLogin:true,
        hasError: false,
        user: action.payload.data
      };
    }

    case LOGOUT_USER: {
      localStorage.removeItem('user')
      return {
        ...state,
        isLogin: false,
      };
    }
    case LOGIN_LG: {
      return {
        ...state,
        isLogin: true,
        user:action.payload.data.user
      };
    }
    case HAS_ERROR: {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const loginLocalStorage = (data) => {
  return {
    type: LOGIN_LG,  
    payload:{data}  
  };
};

export const login = (data) => {
  return {
    type: LOGIN,
    payload: {
      request: {
        url: BASE_ENDPOINT,
        method: "POST",
        data:data,
      },
    },
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export default users;