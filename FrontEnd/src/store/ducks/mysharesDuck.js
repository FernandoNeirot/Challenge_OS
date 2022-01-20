const GET_MYSHARES = "GET_MYSHARES"
const GET_MYSHARES_SUCCESS = "GET_MYSHARES_SUCCESS"
const HAS_ERROR = "HAS_ERROR"

const GET_SYMBOL_LIST = "GET_SYMBOL_LIST"
const GET_SYMBOL_LIST_SUCCESS = "GET_SYMBOL_LIST_SUCCESS"

const ADD_SHARE = "ADD_SHARE"
const ADD_SHARE_SUCCESS = "ADD_SHARE_SUCCESS"

const GET_SHARE = "GET_SHARE"
const GET_SHARE_SUCCESS = "GET_SHARE_SUCCESS"

const GET_QUOTE = "GET_QUOTE"
const GET_QUOTE_SUCCESS = "GET_QUOTE_SUCCESS"



// 16f8fae83429457a904fdaa8cf14a61b

const BASE_ENDPOINT = 'api/myshares';
const initialValues = {
  myshares: [],
  symbolList:[],
  qoute:{
    "meta": {
      "symbol": "AAPL",
      "interval": "15min",
      "currency": "USD",
      "exchange_timezone": "America/New_York",
      "exchange": "NASDAQ",
      "type": "Common Stock"
    },
    "values": [
      {
        "datetime": "2022-01-19 15:30:00",
        "open": "167.50999",
        "high": "167.67000",
        "low": "167.21001",
        "close": "167.25999",
        "volume": "1285843"
      },
      {
        "datetime": "2022-01-19 15:15:00",
        "open": "168.15500",
        "high": "168.22000",
        "low": "167.49500",
        "close": "167.50999",
        "volume": "2550650"
      },
      {
        "datetime": "2022-01-19 15:00:00",
        "open": "167.94501",
        "high": "168.26990",
        "low": "167.66000",
        "close": "168.15990",
        "volume": "2439309"
      }]},
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

    case GET_QUOTE: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_QUOTE_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasError: false,
        qoute: action.payload.data
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
  const {symbol,intervalValue,isHistorical,startDate,endDate}=props
  console.log(props)
  let url ;
  
  if (!isHistorical)
    url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${intervalValue}&start_date=${startDate}&apikey=16f8fae83429457a904fdaa8cf14a61b`;
  else
    url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${intervalValue}&start_date=${startDate}&end_date=${endDate}&apikey=16f8fae83429457a904fdaa8cf14a61b`
console.log(url)
  // return {
  //   type: GET_QUOTE,
  //   payload: {
  //     request: {
  //       url: `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${startDate}%2009:48:00&end_date=${endDate}%2019:48:00&apikey=16f8fae83429457a904fdaa8cf14a61b`,
  //       method: "GET",        
  //     },
  //   },
  // };
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