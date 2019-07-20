import React from 'react';

import TableRow from '../TableRow/TableRow';
import exerciseData from '../../helpers/data/exerciseData';

import './Workout.scss';

class Workout extends React.Component {

  state = {
    workoutExercises : []
  }

  componentDidMount() {
    console.error('hey from mount')
    exerciseData.getExercisesByWorkoutId(this.props.userWorkout.id)
      .then((response) => {
        response.sort(function(a, b){return a.order - b.order});
        this.setState({workoutExercises: response})
      })
      .catch(err => console.error(err))
  }

  render() {
    const exerciseRows = this.state.workoutExercises.map((workoutExercise) => (
      <TableRow key={workoutExercise.id} workoutExercise={workoutExercise}/>
    ))
    return (
      <div class="col-11 col-md-10 m-4">
        <div className="tableHeader">
          <h4>{this.props.userWorkout.name}</h4>
        </div>
        <table class="table table-bordered table-dark">
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
    )
  }
}

export default Workout;