import {
  CREATE_STUDY_FAIL,
  CREATE_STUDY_SUCCESS,
  FETCH_STUDY_FAIL,
  FETCH_STUDY_SUCCESS,
  FETCH_STUDY_REQUEST,
  CREATE_STUDY_REQUEST,
  STUDY_UPDATE_REQUEST,
  STUDY_UPDATE_SUCCESS,
  STUDY_UPDATE_FAIL,
  DELETE_STUDY_SUCCESS,
  DELETE_STUDY_FAIL,
  DELETE_STUDY_REQUEST,
} from "../actions/actionTypes";

export const studyListReducer = (state = { study: [] }, action) => {
  switch (action.type) {
    case FETCH_STUDY_REQUEST:
      return { loading: true };
    case FETCH_STUDY_SUCCESS:
      return { loading: false, study: action.payload };
    case FETCH_STUDY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const studyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STUDY_REQUEST:
      return { loading: true };
    case CREATE_STUDY_SUCCESS:
      return { study: action.payload };
    case CREATE_STUDY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const studyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDY_UPDATE_REQUEST:
      return { loading: true };
    case STUDY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case STUDY_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const studyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STUDY_REQUEST:
      return { loading: true };
    case DELETE_STUDY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_STUDY_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
