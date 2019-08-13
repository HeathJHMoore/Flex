import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import exerciseData from '../../helpers/data/exerciseData';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

import './ExerciseDictionary.scss';

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
      .then((resp) => {
        this.setState({allExercises : resp, shownExercises : resp})
      })
      .catch(console.error('couldnt get exercises'))
  }

  filterExercisesBySearch = (e) => {
    const search = e.target.value;
    console.error(search);
    const newExercises = [];
    if (search === null) {
      this.setState({shownExercises : this.state.allExercises})
    } else {
      this.state.allExercises.forEach((exercise) => {
        if (exercise.name.toLowerCase().includes(search.toLowerCase())) {
        console.error('successful match!!!!')
        newExercises.push(exercise)
        }
      })
    }
    this.setState({shownExercises : newExercises})
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
    const exerciseCards = this.state.shownExercises.map((exercise) => (
      <ExerciseCard exercise={exercise}/>
    ))
    const muscleChoices = this.state.muscleList.map((muscle) => (
      <DropdownItem onClick={this.chooseMuscle}>{muscle}</DropdownItem>
    ))
    return (
      <div className="col-12 mt-2">
        <div className="row justify-content-center mt-2 mb-4 searchExerciseContainer">
          <input type="text" placeholder="Search Exercise By Name" className="col-8 col-sm-6 col-lg-4 text-center createNewWorkoutborder" onChange={this.filterExercisesBySearch}></input>
          <i class="fas fa-search"></i>
        </div>
        <div className="row justify-content-center mt-2 mb-4">
          <Dropdown isOpen={this.state.muscleDropdownToggle} toggle={this.muscleDropdownToggle} className="statisticDropdown">
            <DropdownToggle caret>
              Search By Muscle Group
            </DropdownToggle>
            <DropdownMenu>
              {muscleChoices}
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