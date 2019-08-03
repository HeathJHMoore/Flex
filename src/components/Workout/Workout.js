import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { Link } from 'react-router-dom';

import TableRow from '../TableRow/TableRow';
import exerciseData from '../../helpers/data/exerciseData';

import './Workout.scss';
import workoutData from '../../helpers/data/workoutData';

class Workout extends React.Component {

  state = {
    workoutExercises : [],
    allWorkoutExercises : [],
    workoutMuscles : ''
  }


  getMuscles = () => {
    const exercises = this.state.workoutExercises;
    const muscles = []
    exercises.forEach((exercise) => {
      exercise.muscles.forEach((muscle) => {
        if (muscles.indexOf(muscles) === -1) {
          muscles.push(muscle)
        }
      })
    })
    const muscleString = '';
    muscles.forEach((distinctMuscle, index) => {
      if (index === (muscles.length - 1)) {
        muscleString += `${distinctMuscle}`
      } else {
        muscleString += `${distinctMuscle},`
      }
    })
    this.setState({workoutMuscles : muscleString})
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
        this.getMuscles();
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
    const workoutImages = this.state.workoutExercises.map((exercise) => (
      {
        src: exercise.image,
        altText : "",
        caption : "",
        header : exercise.name
      }
    ))
    return (
        <div className="col-11 col-md-10 col-lg-6 mb-4 mt-4">
          <div className="workoutContainer">
            <div className="workoutHeader mb-2">
              <h4 className="text-left">{this.props.userWorkout.name}</h4>
              <p className="text-left mb-0">{this.state.workoutMuscles}</p>
            </div>
            <div className="workoutBody row p-3">
              <div className="col-5 pt-2 pb-2 d-flex flex-column justify-content-center">
                <div className="mb-1">
                  <h5>Last Attempt:</h5>
                  <h6>July 24th 2019</h6>
                </div>
                <div>
                  <button className="btn btn-secondary">Quick View</button>
                </div>
              </div>
              <div className="col-7">
                <div className="border border-dark shadow">
                <UncontrolledCarousel items={workoutImages} controls={false} indicators={false}/>
                </div>
              </div>
            </div>
            <div className="workoutFooter row justify-content-around mt-3 pr-2 pl-2 mb-2">
              <div className="col-6 col-md-5">
                <Link className="btn actionButton" to={submitWorkoutPath}>Log Attempt</Link>
              </div>
              <div className="col-6 col-md-5">
                <button className="btn btn-danger" onClick={this.deleteWorkout}>Delete Workout</button>
              </div>
            </div>
          </div>
        </div>








      // THIS IS THE CODE THAT IS CURRENTLY BEING USED IN MASTER
      // <div className="row justify-content-center">
      //   <div class="col-11 col-md-10 col-lg-6 mb-4 mt-4 p-0 workoutContainer">
      //     <div className="tableHeader mb-2">
      //     <h4 className="text-left">{this.props.userWorkout.name}</h4>
      //     <p className="text-left mb-0">Muscle Groups: </p>
      //     </div>
      //     <div className="row justify-content-center">
      //       <div className="col-11">
      //         <table class="table table-bordered table-dark workoutTable">
      //           <thead>
      //             <tr className="tableColumnTitles">
      //               <th scope="col" className="blankSpace"></th>
      //               <th scope="col" className="text-center align-middle">Exercise</th>
      //               <th scope="col" className="text-center align-middle">Prescribed Repetitions</th>
      //               <th scope="col" className="text-center align-middle">Prescribed Weight</th>
      //             </tr>
      //           </thead>
      //           <tbody>
      //           {exerciseRows}
      //           </tbody>
      //         </table>
      //       </div>
      //     </div>
      //     <div className="row justify-content-center">
      //       <Link className="btn actionButton mb-3 col-8 col-md-6" to={submitWorkoutPath}>Record Your Performance</Link>
      //     </div>
      //     <div className="row justify-content-center">
      //       <button className="btn btn-danger mb-3 col-8 col-md-6" onClick={this.deleteWorkout}>Delete Workout</button>
      //     </div>
      //   </div>
      // </div>













      // THS IS REALLY OLD CODE, JUST IGNORE IT FOR NOW
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