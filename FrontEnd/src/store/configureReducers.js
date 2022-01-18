import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import errorDuck from "./ducks/errorDuck";
const reducers = combineReducers({
  user:userDuck,
  error:errorDuck

});
export default reducers;
