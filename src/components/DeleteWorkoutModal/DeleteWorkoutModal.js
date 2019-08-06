import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
 } from 'reactstrap';

 import workoutData from '../../helpers/data/workoutData';
 import exerciseData from '../../helpers/data/exerciseData';

 class DeleteWorkoutModal extends React.Component {

  state = {
    modalStatus : this.props.modalStatus
  }

  cancelModal = () => {
    const toggleModal = this.props.toggleDeleteModal;
    toggleModal();
  }

  deleteWorkout = (workoutId, workoutExercises) => {
    workoutData.deleteWorkout(workoutId)
      .then(() => {
        exerciseData.deleteUserWorkoutExercises(workoutExercises)
        .then(() => {
          this.props.getWorkoutsByUser();
        })
        .catch()
      })
      .catch()
  }

  deleteWorkoutEvent = () => {
    this.deleteWorkout(this.props.userWorkout.id, this.props.workoutExercises)
  }

  render() {
    return (
      <Modal isOpen={this.props.modalStatus}>
        <ModalHeader>
          <h3>Delete {this.props.userWorkout.name}</h3>
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this workout?</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn actionButton" onClick={this.cancelModal}>Cancel</button>
          <button className="btn btn-danger" onClick={this.deleteWorkoutEvent}>Delete Workout</button>
        </ModalFooter>
      </Modal>
    )
  }
 }

 export default DeleteWorkoutModal