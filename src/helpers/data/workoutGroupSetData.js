// workoutGroupSetData.js

import getUserWorkouts from './workoutData';
import getGroups from './groupData';

const getFullUserWorkouts = (uid) => new Promise((resolve, reject) => {
  const bigArray = [];
  getUserWorkouts(uid).then((workoutArr) => {
    workoutArr.forEach((workout) => {
      getGroups(workout.id).then((groupArr) => {
        const workoutObj = {
          ...workout,
          groupArr
        };
        bigArray.push(workoutObj);
      });
    });
    resolve(bigArray);
  }).catch((error) => reject(error));
});

export default getFullUserWorkouts;
