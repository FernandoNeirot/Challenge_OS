import { createStore,combineReducers } from 'redux';
import reducers from './configureReducers';
const store = createStore(reducers);
export default store;