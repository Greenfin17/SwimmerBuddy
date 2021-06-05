import firebase from 'firebase';

const signOut = async () => {
  await firebase.auth().signOut();
};

export default signOut;
