// workoutGroupSetData.js

import getUserWorkouts from './workoutData';
import { getGroups } from './groupData';
import getSets from './setData';

const getGroupSetData = (group) => new Promise((resolve, reject) => {
  getSets(group.id).then((setArr) => {
    const groupObj = {
      ...group,
      setArr
    };
    resolve(groupObj);
  }).catch((error) => reject(error));
});

const getWorkoutGroupData = (workout) => new Promise((resolve, reject) => {
  getGroups(workout.id).then((groupArr) => {
    const workoutObj = {
      ...workout,
      groupArr
    };
    resolve(workoutObj);
  }).catch((error) => reject(error));
});

const getFullUserWorkouts = (uid) => new Promise((resolve, reject) => {
  const workoutReturnArr = [];
  const groupTempArr = [];
  getUserWorkouts(uid).then((workoutArr) => {
    workoutArr.forEach((workout) => {
      const midArr = [];
      getGroups(workout.id).then((groupArr) => {
        groupArr.forEach((group) => getSets(group.id).then((setArr) => {
          const groupObj = {
            ...group,
            setArr
          };
          midArr.push(groupObj);
        }));
        groupTempArr.push(midArr);
        const workoutDataObj = {
          ...workout,
          groupArr: midArr
        };
        workoutReturnArr.push(workoutDataObj);
      });
    });
    resolve(workoutReturnArr);
  }).catch((error) => reject(error));
});

export {
  getFullUserWorkouts,
  getGroupSetData,
  getWorkoutGroupData
};
