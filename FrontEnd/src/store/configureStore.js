import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './configureReducers';
import thunk from "redux-thunk";
import { setError } from "./ducks/errorDuck";

export default function configureStore(initialState = {}) //, bearerToken, appInsights
{
    const composeEnhancers = composeWithDevTools({});    
    const axiosInit = {
      baseURL: 'http://localhost:47400/',
    //   withCredentials: true,
    //   mode: 'cors'
    }
    const middlewareConfig = {
        onError({ dispatch, error }) {
            const { response } = error;
            const message = error.message ?? "Request error";
            const title = response.data.title;
            const detail = response.data.errors?.Description[0] ?? title;
            dispatch(setError(message, title, detail))
            return Promise.reject(error)
        }
    };    
        const axiosInstance = axios.create(axiosInit);
           axiosInstance.interceptors.response.use(function (config) {            
            return config;
        }, function (error) {         
            return Promise.reject(error);
        })
    
    const middleware = [thunk, axiosMiddleware(axiosInstance,  middlewareConfig)];
    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));
    return store;
};