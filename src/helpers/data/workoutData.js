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


const getWorkoutByWorkoutId = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`${databaseURL}/Workouts/${workoutId}.json`)
    .then((res) => {
      const workout = {};
      if (res.data !== null) {
        workout.name = res.data.name;
        workout.id = workoutId;
        workout.uid = res.data.uid;
      }
      console.error(workout, 'this is the workout you got back')
      resolve(workout);
    })
    .catch(err => reject(err))
})

const createNewWorkout = (newWorkout) => axios.post(`${databaseURL}/Workouts.json`, newWorkout)

const deleteWorkout = (workout) => axios.delete(`${databaseURL}/Workouts/${workout}.json`)

export default { getWorkoutsByUid, createNewWorkout, getWorkoutByWorkoutId, deleteWorkout};
