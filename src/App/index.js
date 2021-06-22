import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import NavBar from '../components/NavBar';
import { addUser, getUser } from '../helpers/data/userData';
import Routes from '../helpers/Routes';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          username: authed.email.split('@')[0],
          displayName: '',
          club: '',
          location: ''
        };
        getUser(authed.uid).then((userResp) => {
          if (userResp.length < 1) {
            addUser(userInfoObj);
          } else {
            userInfoObj.displayName = userResp[0].displayName;
            userInfoObj.club = userResp[0].club;
            userInfoObj.location = userResp[0].location;
            setUser(userInfoObj);
          }
        });
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes
          user={user}
        />
      </Router>
    </div>
  );
}

export default App;
