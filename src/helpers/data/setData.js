// setData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const cmpSets = (setA, setB) => setA.sequence - setB.sequence;

const setArrDistance = (setArr) => {
  let totalDistance = 0;
  let distance = 0;
  let reps = 0;
  setArr.forEach((set) => {
    distance = Number(set.distance);
    reps = Number(set.repetitions);
    if (Number.isInteger(distance) && Number.isInteger(reps)) {
      totalDistance += (distance * reps);
    }
  });
  return totalDistance;
};

const getSets = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/set.json?orderBy="group_id"&equalTo="${groupId}"`)
    .then((response) => {
      const setArr = Object.values(response.data);
      if (response.data) {
        resolve(setArr);
      } else resolve([]);
    }).catch((error) => reject(error));
});

export {
  getSets, cmpSets,
  setArrDistance
};
