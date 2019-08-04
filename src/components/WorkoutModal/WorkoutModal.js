import React from 'react';
import {Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter} from 'reactstrap';

import './WorkoutModal.scss';
import TableRow from '../TableRow/TableRow';

class WorkoutModal extends React.Component {

  closeModalEvent = () => {
    const closeModal = this.props.openModal;
    closeModal();
  }


  render() {

    const exerciseRows = this.props.workoutExercises.map((workoutExercise) => (
      <TableRow key={workoutExercise.id} workoutExercise={workoutExercise}/>
    ))

    return (
      <Modal isOpen={this.props.workoutModalStatus}>
        <ModalHeader>
          <h3>{this.props.userWorkout.name}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="row justify-content-center tableContainer">
            <div className="col-11">
              <table class="table table-bordered table-dark workoutTable">
                <thead>
                  <tr className="tableColumnTitles">
                    <th scope="col" className="blankSpace"></th>
                    <th scope="col" className="text-center align-middle">Exercise</th>
                    <th scope="col" className="text-center align-middle">Prescribed Repetitions</th>
                    <th scope="col" className="text-center align-middle">Prescribed Weight</th>
                  </tr>
                </thead>
                <tbody>
                {exerciseRows}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn actionButton" onClick={this.closeModalEvent}>Close</button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default WorkoutModal;
