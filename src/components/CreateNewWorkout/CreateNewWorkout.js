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
         InputGroupAddon,
         InputGroupButtonDropdown,
         InputGroupDropdown,
         Input,
} from 'reactstrap';

import exerciseData from '../../helpers/data/exerciseData';
import NewWorkoutTable from '../NewWorkoutTable/NewWorkoutTable';

import './CreateNewWorkout.scss';


class CreateNewWorkout extends React.Component {

  state = {
    allExercises : [],
    newExercises : [],
    isModalOpen : false,
    isDropdownOpen : false,
    selectedExerciseName : '',
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
    ]
  }

  componentDidMount() {
    exerciseData.getExercises()
      .then(exercises => this.setState({allExercises: exercises}))
      .catch(err => console.error(err))
  }

  modalToggle = () => this.setState({isModalOpen: !this.state.isModalOpen})

  dropdownToggle = () => this.setState({isDropdownOpen: !this.state.isDropdownOpen})

  selectExercise = (e) => {
    const newExerciseName = e.target.innerHTML; 
    this.setState({selectedExerciseName : newExerciseName})
  }

  render() {

    const compoundExerciseNames = this.state.allExercises.map((exercise) => {
      if (exercise.type === 'Compound') {
      const exerciseName = exercise.name;
      return <DropdownItem onClick={this.selectExercise}>{exerciseName}</DropdownItem>
      }
    })

    const isolationExerciseNames = this.state.allExercises.map((exercise) => {
      if (exercise.type === 'Isolation') {
      const exerciseName = exercise.name;
      return <DropdownItem onClick={this.selectExercise}>{exerciseName}</DropdownItem>
      }
    })

    const compoundRepetitions = this.state.compoundRepetitions.map((reps) => {
      return <option value={reps}>{reps}</option>
    })

    return (
      <div className="col-12 mt-2">
          <div className="row justify-content-center mb-2">
            <label htmlFor="newWorkoutName" className="col-8 col-sm-5 col-lg-4 text-center">Workout Name</label>
          </div>
          <div className="row justify-content-center mb-3">
            <input type="text" placeholder="Enter Workout Name Here" id="newWorkoutName" className="col-8 col-sm-5 col-lg-4 text-center"></input>
          </div>
          <div className="row justify-content-center mb-2">
            <button className="btn actionButton" onClick={this.modalToggle}>Add An Exercise</button>
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
                                    maxHeight: 200,
                                    width: 350,
                                  },
                                };
                              },
                            },
                          }}>
                            <DropdownItem header>Compound Exercises</DropdownItem>
                            <DropdownItem divider/>
                            {compoundExerciseNames}
                            {compoundExerciseNames}
                            {compoundExerciseNames}
                            <DropdownItem header className="mt-4">Isolation Exercises</DropdownItem>
                            <DropdownItem divider/>
                            {isolationExerciseNames}
                            {isolationExerciseNames}
                            {isolationExerciseNames}
                          </DropdownMenu>
                      </Dropdown>
                  </div>
              </div>
            <div class="row">
            <InputGroup className="mt-4">
              <div className="col-4 text-center">
                <label className="modalLabel pt-2">Exercise Name</label>
              </div>
              <div className="col-8 text-center">
                <Input id="addExerciseName" value={this.state.selectedExerciseName}></Input>
              </div>
            </InputGroup>
            </div>
            <div className="row mt-4 text-center">
              <div className="col-6">
                <div className="mb-1">Repetitions</div>
                <div class="input-group mb-3">
                  <select class="custom-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    {compoundRepetitions}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-1">Weight</div>
                <div class="input-group mb-3">
                  <input type="number" placeholder="100" class="form-control"></input>
                  <label className="modalLabel pt-1 pl-2">lbs</label>
                </div>
              </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="actionButton" onClick={this.modalToggle}>Submit Exercise</Button>
              <Button color="danger" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
          </Modal>
      </div>
    )
  }
}

export default CreateNewWorkout;