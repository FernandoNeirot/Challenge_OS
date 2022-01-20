const GET_MYSHARES = "GET_MYSHARES"
const GET_MYSHARES_SUCCESS = "GET_MYSHARES_SUCCESS"
const HAS_ERROR = "HAS_ERROR"

const GET_SYMBOL_LIST = "GET_SYMBOL_LIST"
const GET_SYMBOL_LIST_SUCCESS = "GET_SYMBOL_LIST_SUCCESS"

const ADD_SHARE = "ADD_SHARE"
const ADD_SHARE_SUCCESS = "ADD_SHARE_SUCCESS"

const DELETE_SHARE = "DELETE_SHARE"
const DELETE_SHARE_SUCCESS = "DELETE_SHARE_SUCCESS"


const GET_SHARE = "GET_SHARE"
const GET_SHARE_SUCCESS = "GET_SHARE_SUCCESS"

const GET_QUOTE = "GET_QUOTE"
const GET_QUOTE_SUCCESS = "GET_QUOTE_SUCCESS"

const CLEAN_QUOTE = "CLEAN_QUOTE"

const BASE_ENDPOINT = 'api/myshares';
const APIKEY='16f8fae83429457a904fdaa8cf14a61b'
const initialValues = {
  myshares: [],
  symbolList:[],
  quote:{
    status:"noData"
  },
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

    case DELETE_SHARE: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_SHARE_SUCCESS: {
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

    case GET_QUOTE: {
      return {
        ...state,
        loading: true,
      };
    }

    case CLEAN_QUOTE: {
      return {
        ...state,
        quote: {
          status:"noData"
        },
      };
    }

    case GET_QUOTE_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
        quote: action.payload.data
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

export const deleteShare = (idShare) => {
  return {
    type: DELETE_SHARE,
    payload: {
      request: {
        url: `${BASE_ENDPOINT}?idShare=${idShare}`,
        method: "DELETE",   
      },
    },
  };
};

export const getShare = (symbol) => {
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

export const getQuote = (props) => {
  const {symbol,intervalText,isHistorical,startDate,endDate}=props
  let url ;
  
  if (!isHistorical)
    url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${intervalText}&start_date=${startDate}&apikey=${APIKEY}`;
  else
    url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${intervalText}&start_date=${startDate}&end_date=${endDate}&apikey=${APIKEY}`

  return {
    type: GET_QUOTE,
    payload: {
      request: {
        url: url,
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

export const cleanQuote = () => {
  return {
    type: CLEAN_QUOTE,
  };
};


export default myshares;