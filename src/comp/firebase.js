import firebase from 'firebase'
var config = {
  apiKey: "API KEY",
  authDomain: "Domain",
  databaseURL: "Database URL",
  projectId: "Project ID",
  storageBucket: "",
  messagingSenderId: "Msg ID"
};
firebase.initializeApp(config);

export default firebase;
