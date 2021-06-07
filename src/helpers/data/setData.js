// setData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getSets = (groupId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/set.json?orderBy="group_id"&equalTo="${groupId}"`)
    .then((response) => {
      const setArr = Object.values(response.data);
      if (response.data) {
        resolve(setArr);
      } else resolve([]);
    }).catch((error) => reject(error));
});

export default getSets;
