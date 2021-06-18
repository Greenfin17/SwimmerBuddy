// workoutCollectionData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { getSingleWorkout } from './workoutData';
import { getCollections } from './collectionData';

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

const getWorkoutCollectionJoins = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workout_collection.json?orderBy="workout_id"&equalTo="${workoutId}"`)
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
      responseArr.forEach((joinObj) => {
        getSingleWorkout(joinObj.workout_id).then((workoutObj) => {
          workoutArr.push(workoutObj);
        });
      }).then(() => {
        resolve(workoutArr);
      });
    })
    .catch((error) => reject(error));
});

const getWorkoutCollectionsArr = (uid, workoutId) => new Promise((resolve, reject) => {
  Promise.all([getCollections(uid), getWorkoutCollectionJoins(workoutId)])
    .then(([collections, joins]) => {
      const workoutCollectionsArr = collections.map((collection) => {
        let checked = false;
        // for loop to allow break statement
        for (let i = 0; i < joins.length; i += 1) {
          if (joins[i].collection_id === collection.id) {
            checked = true;
            break;
          }
        }
        const tmpObj = {
          ...collection,
          checked
        };
        return tmpObj;
      });
      resolve(workoutCollectionsArr);
    }).catch((error) => reject(error));
});

export {
  getCollectionWorkouts, getCollectionWorkoutJoins,
  getWorkoutCollectionJoins, getWorkoutCollectionsArr
};
