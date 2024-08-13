import { database } from "../../API/firebase";
import {
  SET_LOADING,
  SET_FILES,
  SET_FOLDERS
} from "../actions/filefoldersActions";

const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});
const setFiles = (data) => ({
  type: SET_FILES,
  payload: data,
});
const setFolders = (data) => ({
  type: SET_FOLDERS,
  payload: data,
});

export const getFolders = () => (dispatch) => {
  dispatch(setLoading(true));

  database.docs
    .get()
    .then((folders) => {
      const allFolders = [];
      folders.docs.forEach((doc) => {
        allFolders.push({ data: doc.data(), docId: doc.id });
      });
      dispatch(setFolders(allFolders));
    })
    .catch((err) => {
      console.error("Failed to fetch data!");
    });
};
export const getFiles = () => (dispatch) => {
  database.files
    .get()
    .then((files) => {
      const allFiles = [];
      files.docs.forEach((doc) => {
        allFiles.push({ data: doc.data(), docId: doc.id });
      });
      dispatch(setFiles(allFiles));
    })
    .catch((err) => {
      console.error("Failed to fetch data!");
    });
};