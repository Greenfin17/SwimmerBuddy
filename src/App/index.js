import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import NavBar from '../components/NavBar';
import { addUser, getUser } from '../helpers/data/userData';
import { getUserWorkouts } from '../helpers/data/workoutData';
import Routes from '../helpers/Routes';

function App() {
  const [user, setUser] = useState(null);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

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
        getUserWorkouts(authed.uid).then((workoutsArr) => {
          setUserWorkouts(workoutsArr);
        });
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    if (user) {
      getUserWorkouts(user.uid).then((workoutsArr) => {
        if (mounted) {
          setUserWorkouts(workoutsArr);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [triggerSubmit]);

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes
          user={user}
          userWorkouts={userWorkouts}
          setUserWorkouts={setUserWorkouts}
          triggerSubmit={triggerSubmit}
          setTriggerSubmit={setTriggerSubmit}
        />
      </Router>
    </div>
  );
}

export default App;
