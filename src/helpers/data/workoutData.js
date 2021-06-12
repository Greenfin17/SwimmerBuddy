// workoutData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getSingleWorkout = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workout/${workoutId}.json`)
    .then((response) => {
      if (response.data) {
        resolve(response.data);
      } else resolve({});
    })
    .catch((error) => reject(error));
});

const getUserWorkouts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workout.json?orderBy="author_uid"&equalTo="${uid}"`)
    .then((response) => {
      const workoutArr = Object.values(response.data);
      if (response.data) {
        resolve(workoutArr);
      } else resolve([]);
    }).catch((error) => reject(error));
});

const updateWorkout = (workoutId, workoutObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/workout/${workoutId}.json`, workoutObj)
    .then((response) => {
      if (response) {
        resolve(response.data);
      } else resolve('');
    })
    .catch((error) => reject(error));
});

export {
  getSingleWorkout, getUserWorkouts,
  updateWorkout
};
