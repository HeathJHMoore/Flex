import React from 'react';

class NewWorkoutTable extends React.Component {
  render() {
    const {newExercise} = this.props;
    return (
      <tr>
            <td className="text-center align-middle">{newExercise.name}</td>
            <td className="text-center align-middle">{newExercise.repetitions}</td>
            <td className="text-center align-middle">{newExercise.weight} lbs</td>
      </tr>
    )
  }
}

export default NewWorkoutTable;