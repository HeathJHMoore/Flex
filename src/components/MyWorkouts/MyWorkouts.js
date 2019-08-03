import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'

import workoutData from '../../helpers/data/workoutData';
import exerciseData from '../../helpers/data/exerciseData';
import Workout from '../Workout/Workout';

class MyWorkouts extends React.Component {

  state = {
    userWorkouts : []
  }

  getWorkoutsByUser = () => {
    workoutData.getWorkoutsByUid(firebase.auth().currentUser.uid)
    .then((workouts) => {
      this.setState({userWorkouts: workouts})
    })
    .catch(err => console.error(err, 'you didnt get workouts back'))
  }

  componentDidMount() {
    this.getWorkoutsByUser();
  }

  deleteWorkout = (workoutId, workoutExercises) => {
    workoutData.deleteWorkout(workoutId)
      .then(() => {
        exerciseData.deleteUserWorkoutExercises(workoutExercises)
        .then(() => {
          this.getWorkoutsByUser();
        })
        .catch()
      })
      .catch()
  }

  render() {

    const workoutBuilder = this.state.userWorkouts.map((userWorkout) => (
      <Workout key={userWorkout.id} userWorkout={userWorkout} deleteWorkout={this.deleteWorkout}/>
    ))

    return (
      <div className="row justify-content-around">
        {workoutBuilder}
      </div>
     
     
     
      // THIS IS THE CODE BEING USED IN MASTER CURRENTLY
      // <div className="row"> {/* this is new stuff */}
      // <div className="col-12">
      // {workoutBuilder}
      // </div>
      // </div>





      // THIS IS SOME REALLY OLD CODE, DONT USE IT
      // <div className="row d-flex justify-content-center">
      // {workoutBuilder}
      // </div>
    )
  }
}

export default MyWorkouts;