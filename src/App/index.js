import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import NavBar from '../components/NavBar';
import { addUser, getUser } from '../helpers/data/userData';
import { getFullUserWorkouts } from '../helpers/data/workoutGroupSetData';
import Routes from '../helpers/Routes';

function App() {
  const [user, setUser] = useState(null);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          username: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getUser(authed.uid).then((userResp) => {
          if (userResp.length < 1) {
            addUser(userInfoObj);
          }
        });
        getFullUserWorkouts(authed.uid).then((workoutsArr) => setUserWorkouts(workoutsArr));
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  useEffect(() => {
    // getFullUserWorkouts(firebase.auth().currentUser.uid).then((workoutsArr) => setUserWorkouts(workoutsArr));
    console.warn(user);
  }, [submitted]);

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes
          user={user}
          userWorkouts={userWorkouts}
          setUserWorkouts={setUserWorkouts}
          submitted={submitted}
          setSubmitted={setSubmitted}/>
      </Router>
    </div>
  );
}

export default App;
