import React from 'react';

import TableRow from '../TableRow/TableRow';
import exerciseData from '../../helpers/data/exerciseData';

class Workout extends React.Component {

  state = {
    workoutExercises : []
  }

  componentDidMount() {
    console.error('hey from mount')
    exerciseData.getExercisesByWorkoutId(this.props.userWorkout.id)
      .then(response => this.setState({workoutExercises: response}))
      .catch(err => console.error(err))
  }

  render() {
    const exerciseRows = this.state.workoutExercises.map((workoutExercise) => (
      <TableRow key={workoutExercise.id} workoutExercise={workoutExercise} />
    ))
    return (
      <div class="container">
      {/* // i will eventually put in a bootstrap table here */}
      {exerciseRows}
      </div>
    )
  }
}

export default Workout;