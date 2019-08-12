import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import exerciseData from '../../helpers/data/exerciseData';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

class ExerciseDictionary extends React.Component {

  state = {
    allExercises: [],
    shownExercises : [],
    muscleDropdownToggle : false,
    muscleList : [
      'Chest',
      'Abs',
      'Biceps',
      'Triceps',
      'Legs',
      'Back'
    ]
  }

  componentDidMount() {
    exerciseData.getExercises()
      .then((resp) => this.setState({exercises : resp}))
      .catch(console.error('couldnt get exercises'))
  }

  filterExercisesBySearch = (e) => {
    const search = e.target.value
    const newExercises = [];
    this.state.exercises.forEach((exercise) => {
      if (exercise.name == search) {
        newExercises.push(exercise)
      }
    })
    this.setState({exercises : newExercises})
  }

  muscleDropdownToggle = () => {
    this.setState({muscleDropdownToggle : !this.state.muscleDropdownToggle})
  }

  chooseMuscle = (e) => {
    const chosenMuscle = e.target.value;
    const filteredExercises = [];
    this.state.exercises.forEach((exercise) => {
      if (exercise.muscleGroups.indexOf(chosenMuscle) !== -1) {
        filteredExercises.push(exercise)
      }
    })
    this.setState({shownExercises : filteredExercises})
  }

  render() {
    const exerciseCards = this.state.exercises.map((exercise) => (
      <ExerciseCard exercise={exercise}/>
    ))
    const filteredExercises = () => this.state.muscleList.map((muscle) => (
      <DropdownItem onClick={this.chooseMuscle}></DropdownItem>
    ))
    return (
      <div className="col-12 mt-2">
        <div className="row justify-content-center mt-2 mb-4">
          <input type="text" placeholder="Search Exercise By Name" className="col-8 col-sm-5 col-lg-4 text-center createNewWorkoutborder" onChange={this.filterExercisesBySearch}></input>
        </div>
        <div className="row justify-content-center mt-2 mb-4">
          <Dropdown isOpen={this.state.muscleDropdownToggle} toggle={this.toggleMuscleDropdown} className="statisticDropdown">
            <DropdownToggle caret>
              Search By Muscle Group
            </DropdownToggle>
            <DropdownMenu>
              {filteredExercises}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="row">
          {exerciseCards}
        </div>
      </div>
    )
  }
}

export default ExerciseDictionary;