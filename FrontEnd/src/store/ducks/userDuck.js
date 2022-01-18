const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const HAS_ERROR = "HAS_ERROR"

const BASE_ENDPOINT = 'api/User';
const initialValues = {
  user: [],
  loading: false,
  hasError: false,
  hasErrorMessage:"",
}

const users = (state = initialValues, action) => {
  console.log(action)
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
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

export default users;