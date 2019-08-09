import axios from 'axios';
import apiKeys from '../apiKeys.json';
import moment from 'moment';

const compoundRepetitions = [
  "6-6-6",
  "7-6-6",
  "8-6-6",
  "8-7-6",
  "8-7-7",
  "8-8-8"
]
const isolationRepetitions = [
  "8-8-8",
  "9-8-8",
  "10-9-8",
  "10-10-10"
]

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
                workoutExercise.image = exercise.image;
                workoutExercise.muscles = exercise.muscleGroups;
              }
            })
          });
          resolve(workoutExercises);
        })
        .catch(err => console.error(err))
    })
    .catch(err => reject(err))
})

const unsuccessfulExerciseUpdateData = (unsuccessfulExercises) => new Promise((resolve, reject) => {
  if (unsuccessfulExercises.length === 0) {
    resolve('no unsuccessful exercises to update')
  } else {
  unsuccessfulExercises.forEach((exercise, index) => {
    const updatedExercise = exercise;
    updatedExercise.isCurrent = false;
    updatedExercise.date = moment().format();
    delete updatedExercise.name;
    axios.put(`${databaseURL}/userWorkoutExercises/${exercise.id}.json`, updatedExercise)
      .then(() => {
        const newExercise = exercise;
        delete newExercise.name;
        delete newExercise.completedRepetitions;
        newExercise.date = '';
        newExercise.isCurrent = true;
        axios.post(`${databaseURL}/userWorkoutExercises.json`, newExercise)
          .then(() => {
            if (index === (unsuccessfulExercises.length - 1)) {
              resolve('successful')
            }
          }) 
      })
      .catch(err => reject(err));
  })}
})

const createUserWorkoutExercise = (newExercise) => axios.post(`${databaseURL}/userWorkoutExercises.json`, newExercise)



// Original code
// const unsuccessfulExerciseUpdateData = (unsuccessfulExercises) => {
//   unsuccessfulExercises.forEach((exercise) => {
//     const updatedExercise = exercise;
//     updatedExercise.isCurrent = false;
//     updatedExercise.date = moment().format('MMMM Do YYYY');
//     delete updatedExercise.name;
//     axios.put(`${databaseURL}/userWorkoutExercises/${exercise.id}.json`, updatedExercise)
//       .then(() => {
//         const newExercise = exercise;
//         delete newExercise.name;
//         delete newExercise.completedRepetitions;
//         newExercise.date = '';
//         newExercise.isCurrent = true;
//         axios.post(`${databaseURL}/userWorkoutExercises.json`, newExercise);
//       })
//       .catch();
//   })
// }

const successfulExerciseUpdateData = (successfulExercises) => new Promise((resolve, reject) => {
  if (successfulExercises.length === 0) {
    resolve('no successful exercises to udpate')
  } else {
  successfulExercises.forEach((exercise, index) => {
    const successfulExercise = exercise;
    successfulExercise.isCurrent = false;
    successfulExercise.isSuccessful = true;
    successfulExercise.date = moment().format();
    delete successfulExercise.name;
    axios.put(`${databaseURL}/userWorkoutExercises/${exercise.id}.json`, successfulExercise)
      .then(() => {
        successfulExercise.date = '';
        delete successfulExercise.completedRepetitions;
        successfulExercise.isCurrent = true;
        successfulExercise.isSuccessful = false;
        if (compoundRepetitions.indexOf(successfulExercise.repetitions) !== -1) {
          const oldReps = compoundRepetitions.indexOf(successfulExercise.repetitions);
          if (oldReps === (compoundRepetitions.length -1)) {
            const newReps = compoundRepetitions[0];
            successfulExercise.repetitions = newReps;
            successfulExercise.weight = successfulExercise.weight + 5;
            axios.post(`${databaseURL}/userWorkoutExercises.json`, successfulExercise)
              .then(() => {
                if (index === (successfulExercises.length - 1)) {
                  resolve('success')
                }
              })
          } else {
            const newReps = oldReps + 1;
            successfulExercise.repetitions = compoundRepetitions[newReps];
            axios.post(`${databaseURL}/userWorkoutExercises.json`, successfulExercise)
              .then(() => {
                if (index === (successfulExercises.length - 1)) {
                  resolve('success')
                }
              })
          }
        } else {
          const oldReps = isolationRepetitions.indexOf(successfulExercise.repetitions);
          if (oldReps === (isolationRepetitions.length -1)) {
            const newReps = isolationRepetitions[0];
            successfulExercise.repetitions = newReps;
            successfulExercise.weight += 5;
            axios.post(`${databaseURL}/userWorkoutExercises.json`, successfulExercise)
              .then(() => {
                if (index === (successfulExercises.length - 1)) {
                  resolve('success')
                }
              })
          } else {
            const newReps = oldReps + 1;
            successfulExercise.repetitions = isolationRepetitions[newReps];
            axios.post(`${databaseURL}/userWorkoutExercises.json`, successfulExercise)
              .then(() => {
                if (index === (successfulExercises.length - 1)) {
                  resolve('success')
                }
              })
          }
        }
      })
      .catch(err => reject('nope'))
  })}
})

const deleteUserWorkoutExercises = (exercises) => new Promise((resolve, reject) => {
  exercises.forEach((exercise) => {
    axios.delete(`${databaseURL}/userWorkoutExercises/${exercise.id}.json`)
      .then(() => resolve('all exercises deleted'))
      .catch(err => reject(err, 'there was an error deleting exercises'))
  })
})


export default { getExercisesByWorkoutId, 
  getExercises, 
  createUserWorkoutExercise, 
  unsuccessfulExerciseUpdateData, 
  deleteUserWorkoutExercises,
  successfulExerciseUpdateData };
