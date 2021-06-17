// workoutCollectionData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { getSingleWorkout } from './workoutData';

const dbUrl = firebaseConfig.databaseURL;

const getCollectionWorkoutJoins = (collectionId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workout_collection.json?orderBy="collection_id"&equalTo="${collectionId}"`)
    .then((response) => {
      if (response) {
        const responseArr = Object.values(response.data);
        resolve(responseArr);
      } else resolve([]);
    })
    .catch((error) => reject(error));
});

const getCollectionWorkouts = (collectionId) => new Promise((resolve, reject) => {
  const workoutArr = [];
  axios.get(`${dbUrl}/workout_collection.json?orderBy="collection_id"&equalTo="${collectionId}"`)
    .then((response) => {
      const responseArr = Object.values(response.data);
      Promise.all([
        responseArr.forEach((joinObj) => {
          getSingleWorkout(joinObj.workout_id).then((workoutObj) => {
            workoutArr.push(workoutObj);
          });
        })]).then(() => {
        console.warn(workoutArr);
        resolve(workoutArr);
      });
    })
    .catch((error) => reject(error));
});

export {
  getCollectionWorkouts, getCollectionWorkoutJoins
};
