import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import workoutData from '../../helpers/data/workoutData';
import exerciseData from '../../helpers/data/exerciseData';

import Chart from '../ChartComponent/ChartComponent';

class ExerciseStatistics extends React.Component {

  state = {
    userWorkouts : [],
    selectedWorkoutExercises : [],
    workoutDropdownToggle : false,
    exerciseDropdownToggle : false,
  }

  componentDidMount() {
    workoutData.getWorkoutsByUid(firebase.auth().currentUser.uid)
      .then((workouts) => {
        this.setState({userWorkouts : workouts})
        })
      .catch(console.error('you failed getting workouts'))
  }

  chooseWorkout = (e) => {
    const workoutId = e.target.id;
    exerciseData.getExercisesByWorkoutId(workoutId)
      .then((exercises) => {
        const currentExercises = exercises.filter((exercise) => exercise.isCurrent === true);
        const distinctExerciseNames = currentExercises.map((exercise) => exercise.name)
        this.setState({selectedWorkoutExercises : distinctExerciseNames})
      })
      .catch()
  }

  chooseExercise = () => {}

  toggleWorkoutDropdown = () => {
    this.setState({workoutDropdownToggle : !this.state.workoutDropdownToggle})
  }


  toggleExerciseDropdown = () => {
    this.setState({exerciseDropdownToggle : !this.state.exerciseDropdownToggle})
  }


  render() {

    const userWorkoutItems = this.state.userWorkouts.map((workout) => (
      <DropdownItem onClick={this.chooseWorkout} id={workout.id}>{workout.name}</DropdownItem>
    ))
    const userExerciseItems = this.state.selectedWorkoutExercises.map((exercise) => (
      <DropdownItem onClick={this.chooseExercise} id={exercise.id}>{exercise}</DropdownItem>

      ))

    const buttonDisable = this.state.selectedWorkoutExercises.length === 0 ? 'disabled' : ''

    return (
      <div className="col-12 mt-2">
        <div className="row justify-content-center mb-3">
          <Dropdown isOpen={this.state.workoutDropdownToggle} toggle={this.toggleWorkoutDropdown}>
            <DropdownToggle caret>
              Choose A Workout
            </DropdownToggle>
            <DropdownMenu>
              {userWorkoutItems}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="row justify-content-center mb-3">
          <Dropdown isOpen={this.state.exerciseDropdownToggle} toggle={this.toggleExerciseDropdown}>
            {this.state.selectedWorkoutExercises.length === 0 
              ? 
              <DropdownToggle caret disabled>
                Choose An Exercise
              </DropdownToggle>
              :
              <DropdownToggle caret>
                Choose An Exercise
              </DropdownToggle>
              }
            <DropdownMenu>
              {userExerciseItems}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Chart />
      </div>
    )
  }
}

export default ExerciseStatistics;
