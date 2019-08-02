import React from 'react';
import { Link } from 'react-router-dom';

import TableRow from '../TableRow/TableRow';
import exerciseData from '../../helpers/data/exerciseData';

import './Workout.scss';
import workoutData from '../../helpers/data/workoutData';

class Workout extends React.Component {

  state = {
    workoutExercises : [],
    allWorkoutExercises : []
  }

  componentDidMount() {
    exerciseData.getExercisesByWorkoutId(this.props.userWorkout.id)
      .then((response) => {
        this.setState({allWorkoutExercises : response})
        const currentExercises = response.filter((exercise) => {
          return exercise.isCurrent === true;
        });
        currentExercises.sort(function(a, b){return a.order - b.order});
        this.setState({workoutExercises: currentExercises})
      })
      .catch(err => console.error(err))
  }

  deleteWorkout = () => {
    const deleteWorkoutEvent = this.props.deleteWorkout;
    deleteWorkoutEvent(this.props.userWorkout.id, this.state.allWorkoutExercises);
  }

  render() {
    const exerciseRows = this.state.workoutExercises.map((workoutExercise) => (
      <TableRow key={workoutExercise.id} workoutExercise={workoutExercise}/>
    ))
    const submitWorkoutPath = `/SubmitWorkout/${this.props.userWorkout.id}`
    return (
      <div className="row justify-content-center">
        <div class="col-11 col-md-10 col-lg-6 mb-4 mt-4 p-0 workoutContainer">
          <div className="tableHeader mb-2">
          <h4 className="text-left">{this.props.userWorkout.name}</h4>
          <p className="text-left mb-0">Muscle Groups: </p>
          </div>
          <div className="row justify-content-center">
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
          <div className="row justify-content-center">
            <Link className="btn actionButton mb-3 col-8 col-md-6" to={submitWorkoutPath}>Record Your Performance</Link>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-danger mb-3 col-8 col-md-6" onClick={this.deleteWorkout}>Delete Workout</button>
          </div>
        </div>
      </div>
      //   <div class="col-11 col-md-10 mb-4 mt-4 p-0 workoutContainer">
      //   <h4 className="tableHeader">{this.props.userWorkout.name}</h4>
      //   <div className="container">
      //   <table class="table table-bordered table-dark workoutTable">
      //     <thead>
      //       <tr className="tableColumnTitles">
      //         <th scope="col" className="blankSpace"></th>
      //         <th scope="col" className="text-center align-middle">Exercise</th>
      //         <th scope="col" className="text-center align-middle">Prescribed Repetitions</th>
      //         <th scope="col" className="text-center align-middle">Prescribed Weight</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //     {exerciseRows}
      //     </tbody>
      //   </table>
      //   <Link className="btn btn-danger actionButton mb-3" to={submitWorkoutPath}>Record Your Performance</Link>
      //   </div>
      // </div>


    )
  }
}

export default Workout;