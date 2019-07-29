import axios from 'axios';
import apiKeys from '../apiKeys.json';
import moment from 'moment';

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

const createUserWorkoutExercise = (newExercise) => axios.post(`${databaseURL}/userWorkoutExercises.json`, newExercise)

const unsuccessfulExerciseUpdateData = (unsuccessfulExercises) => {
  unsuccessfulExercises.forEach((exercise) => {
    const updatedExercise = exercise;
    updatedExercise.isCurrent = false;
    updatedExercise.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    delete updatedExercise.name;
    axios.put(`${databaseURL}/userWorkoutExercises/${exercise.id}.json`, updatedExercise)
      .then(() => {
        const newExercise = exercise;
        delete newExercise.name;
        newExercise.isCurrent = true;
        axios.post(`${databaseURL}/userWorkoutExercises.json`, newExercise);
      })
      .catch();
  })
}

const successfulExerciseData = (successfulExercises) => {

};

export default { getExercisesByWorkoutId, 
  getExercises, 
  createUserWorkoutExercise, 
  unsuccessfulExerciseUpdateData, 
  successfulExerciseData };
