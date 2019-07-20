import React from 'react';

import './TableRow.scss';

class TableRow extends React.Component {

  state = {
    isEvenRow : false
  }

  componentDidMount() {
    if (this.props.workoutExercise.order === 0 || this.props.workoutExercise.order % 2 === 0) {
      this.setState({isEvenRow : true})
    }
  };

  render() {
    const workoutExercise = this.props.workoutExercise;
    return (
      <tr>
            <th scope="row" className="text-center align-middle rowTitle">Exercise {workoutExercise.order}</th>
            {/* <td {this.state.isEvenRow ? 'className="text-center align-middle tableRowEven"' : 'className="text-center align-middle tableRowOdd"'}>{workoutExercise.name}</td>
            <td {this.state.isEvenRow ? 'className="text-center align-middle tableRowEven"' : 'className="text-center align-middle tableRowOdd"'}>{workoutExercise.repetitions}</td>
            <td {this.state.isEvenRow ? 'className="text-center align-middle tableRowEven"' : 'className="text-center align-middle tableRowOdd"'}>{workoutExercise.weight} lbs</td> */}
            <td className="text-center align-middle tableRow">{workoutExercise.name}</td>
            <td className="text-center align-middle tableRow">{workoutExercise.repetitions}</td>
            <td className="text-center align-middle tableRow">{workoutExercise.weight} lbs</td>
      </tr>
    )
  }
}

export default TableRow;