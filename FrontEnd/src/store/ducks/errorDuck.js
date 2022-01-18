const HAS_ERROR = "HAS_ERROR";
const CLEAN_ERROR = "CLEAN_ERROR";
const FORBIDDEN = "FORBIDDEN";
const CLEAN_FORBIDDEN = "CLEAN_FORBIDDEN";
const CLEAN_UNAUTHORIZED = "CLEAN_UNAUTHORIZED";

const initialState = {
  hasError: false,
  message: "",
  title:"",
  details: "",
};

//Reducer se exporta por default;
export default function error(state = initialState, action) {
  switch (action.type) {
    case HAS_ERROR: {
      return {
        ...state,
        hasError: true,
        title:action.payload.title,
        message: action.payload.message,
        details: action.payload.details,
      };
    }

    case CLEAN_ERROR: {
      return {
        ...state,
        hasError: false,
        title:"",
        details:"",
        message: "",
        previousError: state.message,
      };
    }

    case FORBIDDEN: {
      return {
        ...state,
        isUnauthorized: true,
        groups: action.payload.data?.groups,
        owners: action.payload.data?.owners,
        idRedirect: action.payload.data?.layaoutId,
      };
    }
    case CLEAN_FORBIDDEN: {
      return {
        ...state,
        isUnauthorized: false,
      };
    }
    case CLEAN_UNAUTHORIZED: {
      return {
        ...state,
        groups: "",
        owners: "",
        idRedirect: "",
      };
    }
    default:
      return state;
  }
}

export const setError = (title,message, details = "") => {
  return {
    type: HAS_ERROR,
    payload: {
      message:message,
      title:title,
      details,
    },
  };
};

export const setForbidden = (data) => ({ type: FORBIDDEN, payload: { data } });
export const cleanError = () => ({ type: CLEAN_ERROR });
export const cleanForbidden = () => ({ type: CLEAN_FORBIDDEN });
export const cleanUnauthorized = () => ({ type: CLEAN_UNAUTHORIZED });
