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
    isDropdownOpen : false
  }

  componentDidMount() {
    exerciseData.getExercises()
      .then(exercises => this.setState({allExercises: exercises}))
      .catch(err => console.error(err))
  }

  modalToggle = () => this.setState({isModalOpen: !this.state.isModalOpen})

  dropdownToggle = () => this.setState({isDropdownOpen: !this.state.isDropdownOpen})

  render() {

    const exerciseNames = this.state.allExercises.map((exercise) => {
      const exerciseName = exercise.name;
      return <DropdownItem>{exerciseName}</DropdownItem>
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
            <ModalBody>
              <InputGroup>
              <Input placeholder="Choose An Exercise"/>
              <InputGroupButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.dropdownToggle}>
              <DropdownToggle caret className="">
              </DropdownToggle>
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
                          maxHeight: 100,
                        },
                      };
                    },
                  },
                }}>
                {exerciseNames}
              </DropdownMenu>
              </InputGroupButtonDropdown>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="actionButton" onClick={this.modalToggle}>Submit Exercise</Button>{' '}
              <Button color="danger" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
          </Modal>
      </div>
    )
  }
}

export default CreateNewWorkout;