const GET_MYSHARES = "GET_MYSHARES"
const GET_MYSHARES_SUCCESS = "GET_MYSHARES_SUCCESS"
const HAS_ERROR = "HAS_ERROR"

const GET_SYMBOL_LIST = "GET_SYMBOL_LIST"
const GET_SYMBOL_LIST_SUCCESS = "GET_SYMBOL_LIST_SUCCESS"

const ADD_SHARE = "ADD_SHARE"
const ADD_SHARE_SUCCESS = "ADD_SHARE_SUCCESS"

const GET_SHARE = "GET_SHARE"
const GET_SHARE_SUCCESS = "GET_SHARE_SUCCESS"


// 16f8fae83429457a904fdaa8cf14a61b

const BASE_ENDPOINT = 'api/myshares';
const initialValues = {
  myshares: [],
  symbolList:[],
  loading: false,
  hasError: false,
  hasErrorMessage:"",
}

const myshares = (state = initialValues, action) => {
  switch (action.type) {
    case GET_SYMBOL_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SYMBOL_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
        symbolList: action.payload.data.data
      };
    }

    case ADD_SHARE: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_SHARE_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
      };
    }

    case GET_SHARE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SHARE_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
      };
    }

    case GET_MYSHARES: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MYSHARES_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
        myshares: action.payload.data
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

export const getSymbolList = () => {
  return {
    type: GET_SYMBOL_LIST,
    payload: {
      request: {
        url: `https://api.twelvedata.com/stocks?source=docs&exchange=neo`,
        method: "GET",        
      },
    },
  };
};
export const addShare = (data) => {
  console.log("addShare")
  return {
    type: ADD_SHARE,
    payload: {
      request: {
        url: BASE_ENDPOINT,
        method: "POST",        
        data:data,
      },
    },
  };
};

export const getShare = (symbol) => {
  console.log("getShare")
  return {
    type: GET_SHARE,
    payload: {
      request: {
        url: `https://api.twelvedata.com/stocks?symbol=${symbol}&source=docs&exchange=neo`,
        method: "GET",        
      },
    },
  };
};

export const getMySharesByUser = (data="") => {
  return {
    type: GET_MYSHARES,
    payload: {
      request: {
        url: `${BASE_ENDPOINT}?mail=${data}`,
        method: "GET",        
      },
    },
  };
};

export default myshares;