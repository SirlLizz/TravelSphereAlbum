import {
    SET_LOADING,
    SET_FILES,
    SET_FOLDERS
  } from "../actions/filefoldersActions";
  
  const initialState = {
    isLoading: true,
    folder: "root",
    Folders: null,
    Files: null,
  };
  
  const filefolderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_LOADING:
        state = { ...state, isLoading: payload };
        return state;
      case SET_FILES:
        state = { ...state, Files: payload };
        return state;
      case SET_FOLDERS:
        state = { ...state, Folders: payload };
        return state;
      default:
        return state;
    }
  };
  export default filefolderReducer;