// collectionData.js

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getCollections = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/collection.json?orderBy="author_uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        const responseObj = Object.values(response.data);
        resolve(responseObj);
      } else resolve([]);
    })
    .catch((error) => reject(error));
});

const getSingleCollection = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/collection/${id}.json`)
    .then((response) => {
      if (response.data) {
        resolve(response.data);
      } else resolve({});
    })
    .catch((error) => reject(error));
});

export {
  getCollections, getSingleCollection
};
