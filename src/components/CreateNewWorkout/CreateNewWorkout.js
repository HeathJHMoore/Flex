import React from 'react';
import { Button, 
         Modal, 
         ModalHeader, 
         ModalBody, 
         ModalFooter, 
         Dropdown, 
         DropdownToggle, 
         DropdownMenu, 
         DropdownItem,
         InputGroup,
         Input,
         Popover, 
         PopoverHeader, 
         PopoverBody
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import exerciseData from '../../helpers/data/exerciseData';
import NewExerciseRow from '../NewExerciseRow/NewExerciseRow';
import workoutData from '../../helpers/data/workoutData';

import './CreateNewWorkout.scss';


class CreateNewWorkout extends React.Component {

  state = {
    allExercises : [],
    newExercises : [],
    isModalOpen : false,
    isDropdownOpen : false,
    isPopOverOpen : false,
    isSelectedExerciseCompound: true,
    selectedExerciseName : '',
    selectedExerciseId : '',
    workoutName : '',
    userWorkouts : [],
    compoundRepetitions : [
      "6-6-6",
      "7-6-6",
      "8-6-6",
      "8-7-6",
      "8-7-7",
      "8-8-8"
    ],
    isolationRepetitions : [
      "8-8-8",
      "9-8-8",
      "10-9-8",
      "10-10-10"
    ],
    compoundExercises : [],
    isolationExercises : [],
    activateSubmitWorkoutButton : true
  }

  exerciseTypeOrganizer = () => {
    const compoundExercises = [];
    this.state.allExercises.forEach((exercise) => {
      if (exercise.type === 'Compound') {
        compoundExercises.push(exercise.name);
      }
    })
    const isolationExercises = [];
    this.state.allExercises.forEach((exercise) => {
      if (exercise.type === 'Isolation') {
        isolationExercises.push(exercise.name)
      }
    })
    this.setState({compoundExercises : compoundExercises, isolationExercises: isolationExercises})
  }

  componentDidMount() {
    exerciseData.getExercises()
      .then(exercises => {
        this.setState({allExercises: exercises})
        this.exerciseTypeOrganizer();
      })
      .catch(err => console.error(err))
    workoutData.getWorkoutsByUid(firebase.auth().currentUser.uid)
      .then(userWorkouts => this.setState({userWorkouts : userWorkouts}))
      .catch()
  }

  modalToggle = () => this.setState({isModalOpen: !this.state.isModalOpen})

  dropdownToggle = () => this.setState({isDropdownOpen: !this.state.isDropdownOpen})

  popoverToggle = () => this.setState()

  setWorkoutName = (e) => {
    const newWorkoutName = e.target.value;
    this.setState({workoutName : newWorkoutName})
    const userWorkoutNames = this.state.userWorkouts.map((workout) => {
      return workout.name;
    })
    if (userWorkoutNames.indexOf(newWorkoutName) !== -1) {
      this.setState({activateSubmitWorkoutButton : false, isPopOverOpen : true})
    } else {
      this.setState({activateSubmitWorkoutButton : true, isPopOverOpen : false})
    }
  }

  selectExercise = (e) => {
    const newExerciseName = e.target.innerHTML; 
    this.setState({selectedExerciseName : newExerciseName})
    if (this.state.compoundExercises.indexOf(newExerciseName) === -1) {
      this.setState({isSelectedExerciseCompound : false})
    } else {
      this.setState({isSelectedExerciseCompound : true})
    }
    this.state.allExercises.forEach((exercise) => {
      if (exercise.name === newExerciseName) {
        this.setState({selectedExerciseId : exercise.id})
      }
    })
  }

  submitExercise = () => {
    const exerciseName = this.state.selectedExerciseName;
    const exerciseReps = document.getElementById('repetitionSelection').value;
    const exerciseWeight = document.getElementById('weightSelection').value;
    const exerciseId = this.state.selectedExerciseId;
    const newExercise = {
      name : exerciseName,
      weight : exerciseWeight,
      repetitions : exerciseReps,
      Date : '',
      isSuccessful : false,
      isCurrent : true,
      workoutId : '',
      exerciseId : exerciseId,
    }
    const newExercises = this.state.newExercises;
    newExercises.push(newExercise);
    this.setState({newExercises : newExercises})
    this.modalToggle();
  }

  submitWorkout = () => {
    const workoutName = this.state.workoutName;
    const workoutUser = firebase.auth().currentUser.uid;
    const newWorkout = {
      name: workoutName,
      uid: workoutUser
    }
    workoutData.createNewWorkout(newWorkout)
      .then(() => {
        const newExercises = this.state.newExercises;
        this.setState({newExercises : []});
        workoutData.getWorkoutsByUid(firebase.auth().currentUser.uid)
          .then((userWorkouts) => {
            const workoutName = this.state.workoutName;
            const currentWorkout = userWorkouts.filter(workout => workout.name === workoutName);
            newExercises.forEach((exercise) => {
              exercise.workoutId = currentWorkout[0].id;
              exerciseData.createUserWorkoutExercise(exercise);
            })
          })
          .catch(err => console.error(err, 'you weren\'t able to get workouts'))
      })
      .catch(err => console.error(err, 'you didnt add after all'))
  }

  render() {

    const organizeExerciseByMuslceGroup = (muscle) => {
      const muscleExercises = this.state.allExercises.map((exercise) => {
        if (exercise.muscleGroups.includes(`${muscle}`)) {
          const exerciseName = exercise.name;
          return <DropdownItem onClick={this.selectExercise}>{exerciseName}</DropdownItem>
        }
      })
      return muscleExercises;
    }

    const chestExercises = organizeExerciseByMuslceGroup('Chest');
    const bicepExercises = organizeExerciseByMuslceGroup('Biceps');
    const tricepExercises = organizeExerciseByMuslceGroup('Triceps');
    const legExercises = organizeExerciseByMuslceGroup('Legs');
    const abExercises = organizeExerciseByMuslceGroup('Abs');
    const shoulderExercises = organizeExerciseByMuslceGroup('Shoulders');
    const backExercises = organizeExerciseByMuslceGroup('Back');

    const compoundRepetitions = this.state.compoundRepetitions.map((reps) => {
      return <option value={reps}>{reps}</option>
    })

    const isolationRepetitions = this.state.isolationRepetitions.map((reps) => {
      return <option value={reps}>{reps}</option>
    })

    const newExerciseRows = this.state.newExercises.map((newExercise) => (
      <NewExerciseRow newExercise={newExercise}/>
    ))

    const isButtonActivated = this.state.activateSubmitWorkoutButton;

    return (
      <div className="col-12 mt-2">
          <div className="row justify-content-center mb-2">
            <label htmlFor="newWorkoutName" className="col-8 col-sm-5 col-lg-4 text-center">Workout Name</label>
          </div>
          <div className="row justify-content-center mb-3">
            <input type="text" placeholder="Enter Workout Name Here" id="newWorkoutName" className="col-8 col-sm-5 col-lg-4 text-center" onChange={this.setWorkoutName}></input>
          </div>
          <div className="row justify-content-center mb-4">
            <button className="btn actionButton" onClick={this.modalToggle}>Add An Exercise</button>
          </div>
          <div className="row justify-content-center mb-2">
            <div className="col-12 col-lg-11">
              <table class="table table-bordered table-dark workoutTable">
                <thead>
                  <tr className="tableColumnTitles">
                    <th scope="col" className="text-center align-middle">Exercise</th>
                    <th scope="col" className="text-center align-middle">Repetitions</th>
                    <th scope="col" className="text-center align-middle">Weight</th>
                    <th scope="col" className="text-center align-middle blankSpace"></th>
                  </tr>
                </thead>
                <tbody>
                  {newExerciseRows}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-center">
          {
            isButtonActivated 
            ? <button id="submitButton" className="btn actionButton" onClick={this.submitWorkout}>Submit Workout</button>
            : <button id="submitButton" className="btn actionButton" disabled>Submit Workout</button>
          }
          <Popover placement="bottom" isOpen={this.state.isPopOverOpen} target="submitButton">
            <PopoverHeader className="popOverHeader text-center">WHOOPS!!!</PopoverHeader>
            <PopoverBody className="popOverBody text-center">You already have a workout with this name! Please choose a different workout name</PopoverBody>
        </Popover>
          </div>
          <Modal isOpen={this.state.isModalOpen}>
            <ModalHeader>Add An Exercise</ModalHeader>
              <ModalBody class="container">
                <div class="row justify-content-center">
                  <div className="col-10 text-center">
                    <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.dropdownToggle}>
                      <div className="row justify-content-center">
                        <DropdownToggle caret onClick={this.dropdownToggle} className="col-10">
                          Choose an Exercise
                        </DropdownToggle>
                      </div>
                        <DropdownMenu modifiers={{
                          setMaxHeight: {
                              enabled: true,
                              order: 890,
                              fn: (data) => {
                                return {
                                  ...data,
                                  styles: {
                                    ...data.styles,
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    width: 300,
                                  },
                                };
                              },
                            },
                          }}>
                            <DropdownItem header className="dropdownHeader">Chest</DropdownItem>
                            <DropdownItem divider/>
                            {chestExercises}
                            <DropdownItem header className="dropdownHeader mt-4">Triceps</DropdownItem>
                            <DropdownItem divider/>
                            {tricepExercises}
                            <DropdownItem header className="dropdownHeader mt-4">Biceps</DropdownItem>
                            <DropdownItem divider/>
                            {bicepExercises}
                            <DropdownItem header className="dropdownHeader mt-4">Shoulders</DropdownItem>
                            <DropdownItem divider/>
                            {shoulderExercises}
                            <DropdownItem header className="dropdownHeader mt-4">Back</DropdownItem>
                            <DropdownItem divider/>
                            {backExercises}
                            <DropdownItem header className="dropdownHeader mt-4">Legs</DropdownItem>
                            <DropdownItem divider/>
                            {legExercises}
                            <DropdownItem header className="dropdownHeader mt-4">Abs</DropdownItem>
                            <DropdownItem divider/>
                            {abExercises}
                          </DropdownMenu>
                      </Dropdown>
                  </div>
              </div>
            <div class="row">
            <InputGroup className="mt-4">
              <div className="col-5 col-md-4 text-center">
                <label className="modalLabel pt-2">Exercise Name</label>
              </div>
              <div className="col-7 col-md-8 text-center">
                <Input id="addExerciseName" value={this.state.selectedExerciseName}></Input>
              </div>
            </InputGroup>
            </div>
            <div className="row mt-4 text-center">
              <div className="col-6">
                <div className="mb-1">Repetitions</div>
                <div class="input-group mb-3">
                  <select class="custom-select" id="repetitionSelection" onChange={this.chooseRepetitions}>
                    <option selected>Choose...</option>
                    {this.state.isSelectedExerciseCompound ? compoundRepetitions : isolationRepetitions}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-1">Weight</div>
                <div class="input-group mb-3">
                  <input id="weightSelection" type="number" placeholder="100" class="form-control"></input>
                  <label className="modalLabel pt-1 pl-2">lbs</label>
                </div>
              </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="actionButton" onClick={this.submitExercise}>Submit Exercise</Button>
              <Button color="danger" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
          </Modal>
      </div>
    )
  }
}

export default CreateNewWorkout;