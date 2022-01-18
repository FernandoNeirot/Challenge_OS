import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import errorDuck from "./ducks/errorDuck";
import mysharesDuck from "./ducks/mysharesDuck";
const reducers = combineReducers({
  user:userDuck,
  error:errorDuck,
  myshares:mysharesDuck
});
export default reducers;
