import React from 'react';

import './NewExerciseRow.scss';

class NewWorkoutTable extends React.Component {

  deleteExerciseEvent = () => {
    const deleteExercise = this.props.deleteExercise;
    deleteExercise(this.props.newExercise.tableId)
  }

  render() {
    const {newExercise} = this.props;
    return (
      <tr className="newExerciseRow">
            <td className="text-center align-middle">{newExercise.name}</td>
            <td className="text-center align-middle">{newExercise.repetitions}</td>
            <td className="text-center align-middle">{newExercise.weight} lbs</td>
            <td className="text-center align-middle createNewBlankSpace"><i class="fas fa-times deleteCross" onClick={this.deleteExerciseEvent}></i><i class="fas fa-pen penEdit"></i></td>
      </tr>
    )
  }
}

export default NewWorkoutTable;