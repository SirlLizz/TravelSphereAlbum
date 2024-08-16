import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementIdpId: process.env.REACT_APP_measurementId,
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export async function getFolders(path){
  const listRef = storage.ref(path);
  const res = await listRef.listAll();

  return res.prefixes.map((prefix) => ({
    name: prefix.name.split('/').pop(),
    path: prefix.name,
  }));

}

export async function getFiles(path){
  const listRef = storage.ref(path);
  const res = await listRef.listAll();

  return await Promise.all(res.items.map( async (item) => ({
    name: item.name.split('/').pop(),
    path: item.name,
    url: await item.getDownloadURL(),
  })));
}
