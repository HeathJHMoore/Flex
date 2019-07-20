import React from 'react';
import { Link } from 'react-router-dom';

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
        const currentExercises = response.filter((exercise) => {
          return exercise.isCurrent === true;
        });
        currentExercises.sort(function(a, b){return a.order - b.order});
        this.setState({workoutExercises: currentExercises})
      })
      .catch(err => console.error(err))
  }

  render() {
    const exerciseRows = this.state.workoutExercises.map((workoutExercise) => (
      <TableRow key={workoutExercise.id} workoutExercise={workoutExercise}/>
    ))
    const submitWorkoutPath = `/SubmitWorkout/:${this.props.userWorkout.id}`
    return (
      <div class="col-11 col-md-10 mb-4 mt-4 p-0 workoutContainer">
        <h4 className="tableHeader">{this.props.userWorkout.name}</h4>
        <div className="container">
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
        <Link className="btn btn-danger actionButton mb-3" to={submitWorkoutPath}>Record Your Performance</Link>
        </div>
      </div>
    )
  }
}

export default Workout;