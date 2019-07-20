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
    const rowEvenOdd = this.state.isEvenRow ? "tableRowEven" : "tableRowOdd"
    const rowClassName = "text-center align-middle " + rowEvenOdd;
    return (
      <tr>
            <th scope="row" className="text-center align-middle rowTitle">Exercise {workoutExercise.order}</th>
            <td className={rowClassName}>{workoutExercise.name}</td>
            <td className={rowClassName}>{workoutExercise.repetitions}</td>
            <td className={rowClassName}>{workoutExercise.weight} lbs</td>
      </tr>
    )
  }
}

export default TableRow;