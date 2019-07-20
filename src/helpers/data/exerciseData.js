import axios from 'axios';
import apiKeys from '../apiKeys.json';

const databaseURL = apiKeys.firebaseKeys.databaseURL;

const getExercises = () => new Promise((resolve, reject) => {
  axios.get(`${databaseURL}/ExerciseDictionary.json`)
    .then((res) => {
      const exercises = [];
      Object.keys(res.data).map((key) => {
        res.data[key].id = key;
        exercises.push(res.data[key]);
      })
      resolve(exercises);
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
      getExercises()
        .then((exercises) => {
          workoutExercises.forEach((workoutExercise) => {
            exercises.forEach((exercise) => {
              if (exercise.id === workoutExercise.exerciseId) {
                workoutExercise.name = exercise.name;
              }
            })
          });
          resolve(workoutExercises);
        })
        .catch(err => console.error(err))
    })
    .catch(err => reject(err))
})

export default { getExercisesByWorkoutId };
