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
    userWorkoutExercises : [],
    dropdownToggle : false
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

  toggleWorkoutDropdown = () => {
    this.setState({dropdownToggle : !this.state.dropdownToggle})
  }

  render() {

    const userWorkoutItems = this.state.userWorkouts.map((workout) => (
      <DropdownItem onClick={this.chooseWorkout} id={workout.id}>{workout.name}</DropdownItem>
    ))

    return (
      <div className="col-12">
        <div className="row">
          <Dropdown isOpen={this.state.dropdownToggle} toggle={this.toggleWorkoutDropdown}>
            <DropdownToggle caret>
              Choose A Workout
            </DropdownToggle>
            <DropdownMenu>
              {userWorkoutItems}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Chart />
      </div>
    )
  }
}

export default ExerciseStatistics;
