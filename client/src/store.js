import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  studyCreateReducer,
  studyListReducer,
  studyUpdateReducer,
  studyDeleteReducer,
} from "./reducers/studyReducers";

const reducer = combineReducers({
  userLogin: userSigninReducer,
  userRegister: userRegisterReducer,
  studyList: studyListReducer,
  studyCreate: studyCreateReducer,
  userUpdate: userUpdateReducer,
  studyUpdate: studyUpdateReducer,
  studyDelete: studyDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
