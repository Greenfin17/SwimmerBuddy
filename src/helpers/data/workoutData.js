// workoutData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getUserWorkouts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workout.json?orderBy="author_uid"&equalTo="${uid}"`)
    .then((response) => {
      const workoutArr = Object.values(response.data);
      if (response.data) {
        resolve(workoutArr);
      } else resolve([]);
    }).catch((error) => reject(error));
});

export default getUserWorkouts;
