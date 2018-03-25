import firebase from 'firebase';

import { firebaseConfig } from '../firebaseConfig';

if (firebase.apps.length === 0) {
  firebase.initializeApp({ ...firebaseConfig });
}

const database = firebase.database();

export default database;
