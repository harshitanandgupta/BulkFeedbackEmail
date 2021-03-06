import { FETCH_USER } from "../actions/types";
const authReducer = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      if (action.payload === "") return false;
      return action.payload;
    default:
      return state;
  }
};
export default authReducer;
