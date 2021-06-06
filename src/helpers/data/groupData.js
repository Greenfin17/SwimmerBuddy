// groupData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getGroups = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/group.json?orderBy="workout_id"&equalTo="${workoutId}"`)
    .then((response) => {
      const groupArr = Object.values(response.data);
      if (response.data) {
        resolve(groupArr);
      } else resolve([]);
    }).catch((error) => reject(error));
});

export default getGroups;