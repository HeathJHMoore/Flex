import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import workoutData from '../../helpers/data/workoutData';
import exerciseData from '../../helpers/data/exerciseData';
import moment from 'moment';

import Chart from '../ChartComponent/ChartComponent';

class ExerciseStatistics extends React.Component {

  state = {
    userWorkouts : [],
    selectedWorkoutId : [],
    selectedWorkoutExercises : [],
    historicSuccessfulExercises : [],
    workoutDropdownToggle : false,
    exerciseDropdownToggle : false,
    selectedExerciseName : '',
    trendedDateLabels : [],
    trendedWeights : [],
    trendedWorkPerformed : []
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
        const historicSuccessfulExercises = exercises.filter((exercise) => exercise.isSuccessful === true)
        this.setState({selectedWorkoutExercises : currentExercises, selectedWorkoutId : workoutId, historicSuccessfulExercises : historicSuccessfulExercises})
      })
      .catch()
  }

  chooseExercise = (e) => {
    const exerciseId = e.target.id;
    const filteredHistoricExercises = this.state.historicSuccessfulExercises.filter((exercise) => exercise.exerciseId === exerciseId)
    console.error(filteredHistoricExercises, 'this is historic exercises')
    const filteredSuccessfulExercises = filteredHistoricExercises.map((successfulExercise) => (
      {
        date : successfulExercise.date,
        completedRepetitions : successfulExercise.completedRepetitions,
        weight : successfulExercise.weight,
        name : successfulExercise.name,
        completedRepetitions : successfulExercise.completedRepetitions
      }
    ))
    filteredSuccessfulExercises.sort(function(a, b){
      const dateA = moment(a.date).format();
      const dateB = moment(b.date).format();
      // eslint-disable-next-line no-nested-ternary
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    });
    const updatedDateLabels = filteredSuccessfulExercises.map((exerciseObject) => {
      return moment(exerciseObject.date).format('MMMM Do, YYYY')
    })
    const updatedWeights = filteredSuccessfulExercises.map((exerciseObject) => {
      return exerciseObject.weight
    })
    const updatedWorkDone = filteredSuccessfulExercises.map((exerciseObject) => {
      const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
      const completedRepetitionsSum = exerciseObject.completedRepetitions.split('-').reduce(reducer);
      return (completedRepetitionsSum * exerciseObject.weight)
    })
    const exerciseName = filteredSuccessfulExercises[0].name;
    this.setState({trendedDateLabels : updatedDateLabels, 
      trendedWeights : updatedWeights, 
      selectedExerciseName : exerciseName,
      trendedWorkPerformed : updatedWorkDone
    })
  }

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
      <DropdownItem onClick={this.chooseExercise} id={exercise.exerciseId}>{exercise.name}</DropdownItem>

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
        <h3 className="text-center mt-4 border-bottom border-dark">Exercise Report</h3>
        <Chart 
        data={this.state.trendedWeights} 
        labels={this.state.trendedDateLabels}
        exerciseName={this.state.selectedExerciseName}
        yAxisLabel='Weight (lbs)'
         />
        <Chart 
        data={this.state.trendedWorkPerformed} 
        labels={this.state.trendedDateLabels}
        exerciseName={this.state.selectedExerciseName}
        yAxisLabel='Total Weight Lifted (lbs)'
         />
      </div>
    )
  }
}

export default ExerciseStatistics;
