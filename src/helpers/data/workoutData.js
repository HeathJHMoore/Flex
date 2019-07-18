import axios from 'axios';
import apiKeys from '../apiKeys.json';

const databaseURL = apiKeys.firebaseKeys.databaseURL;

const getWorkoutsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${databaseURL}/Workouts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const userWorkouts = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          userWorkouts.push(res.data[key])
        })
      }
      resolve(userWorkouts);
    })
    .catch(err => reject(err))
})

export default { getWorkoutsByUid };
