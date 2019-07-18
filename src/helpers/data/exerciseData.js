import axios from 'axios';
import apiKeys from '../apiKeys.json';

const databaseURL = apiKeys.firebaseKeys.databaseURL;

const getExercises = () => new Promise((resolve, reject) => {
  axios.get(`${databaseURL}/ExerciseDictionary.json`)
    .then((res) => {
      console.error(res.data);
      resolve(res.data);
    })
    .catch(err => reject(err))
})

const getExercisesByWorkoutId = (workoutId) => new Promise((resolve, reject) => {
  axios.get(`${databaseURL}/userWorkoutExercises.json?orderBy="workoutId"&equalTo="${workoutId}"`)
    .then((res) => {
      const workoutExercises = [];
      Object.keys(res.data).map((key) => {
        res.data[key].id = key;
        workoutExercises.push(res.data[key]);
      })
      resolve(workoutExercises);
    })
    .catch(err => reject(err))
})

export default { getExercisesByWorkoutId };
