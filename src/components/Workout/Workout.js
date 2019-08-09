import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TableRow from '../TableRow/TableRow';
import exerciseData from '../../helpers/data/exerciseData';
import workoutData from '../../helpers/data/workoutData';
import WorkoutModal from '../WorkoutModal/WorkoutModal';
import DeleteWorkoutModal from '../DeleteWorkoutModal/DeleteWorkoutModal';

import './Workout.scss';

class Workout extends React.Component {

  state = {
    workoutExercises : [],
    allWorkoutExercises : [],
    workoutMuscles : '',
    workoutModalStatus : false,
    deleteWorkoutModalStatus : false
  }

  openModal = () => {
    this.setState({workoutModalStatus : !this.state.workoutModalStatus})
  }


  getMuscles = () => {
    const exercises = this.state.workoutExercises;
    const muscles = []
    exercises.forEach((exercise) => {
      exercise.muscles.forEach((muscle) => {
        if (muscles.indexOf(muscle) === -1) {
          muscles.push(muscle)
        }
      })
    })
    let muscleString = '';
    muscles.forEach((distinctMuscle, index) => {
      if (index === (muscles.length - 1)) {
        muscleString += `${distinctMuscle}`
      } else {
        muscleString += `${distinctMuscle}, `
      }
    })
    return muscleString;
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

  toggleDeleteModal = () => {
    this.setState({deleteWorkoutModalStatus : !this.state.deleteWorkoutModalStatus})
  }

  deleteWorkout = () => {
    const deleteWorkoutEvent = this.props.deleteWorkout;
    console.error(this.state.allWorkoutExercises)
    deleteWorkoutEvent(this.props.userWorkout.id, this.state.allWorkoutExercises);
  }

  render() {
    const exerciseRows = this.state.workoutExercises.map((workoutExercise) => (
      <TableRow key={workoutExercise.id} workoutExercise={workoutExercise}/>
    ))
    const workoutMuslces = this.getMuscles();
    const submitWorkoutPath = `/SubmitWorkout/${this.props.userWorkout.id}`
    const workoutImages = this.state.workoutExercises.map((exercise) => (
      {
        src: exercise.image,
        altText : "",
        caption : "",
        header : exercise.name
      }
    ))
    const lastCompleted = moment(this.props.userWorkout.lastCompleted).format('MMMM Do, YYYY');
    return (
        <div className="col-11 col-md-10 col-lg-6 mb-4 mt-4 mx-auto workoutCardContainer">
          <div className="workoutContainer">
            <div className="workoutHeader mb-2 pl-1">
              <h4 className="text-left mb-1">{this.props.userWorkout.name}</h4>
              <p className="text-left mb-0">Muscle Groups: {workoutMuslces}</p>
              <i class="fas fa-times-circle" onClick={this.toggleDeleteModal}></i>
            </div>
            <div className="workoutBody row p-3">
              <div className="col-5 pb-2 d-flex flex-column justify-content-center">
                <div className="mb-1">
                  <h5>Last Attempt:</h5>
                  <h6>{lastCompleted}</h6>
                </div>
                <div>
                  <Link className="btn actionButton" to={submitWorkoutPath}>New Attempt</Link>
                </div>
              </div>
              <div className="col-7">
                <div className="border border-dark shadow">
                <UncontrolledCarousel items={workoutImages} controls={false} indicators={false}/>
                </div>
              </div>
            </div>
            <div className="workoutFooter mt-3 p-2 border border-dark bg-dark">
                <div className="row justify-content-around">
                  <div className="col-8 col-md-5">
                   <button className="btn actionButton" onClick={this.openModal}>Workout Summary</button>
                  </div>
                  {/* <div className="col-6 col-md-5">
                    <button className="btn btn-danger" onClick={this.deleteWorkout}>Delete Workout</button>
                  </div> */}
                </div>
            </div>
            {/* <div className="workoutFooter row justify-content-around mt-3">
              <div className="col-6 col-md-5">
                <Link className="btn actionButton" to={submitWorkoutPath}>Log Attempt</Link>
              </div>
              <div className="col-6 col-md-5">
                <button className="btn btn-danger" onClick={this.deleteWorkout}>Delete Workout</button>
              </div>
            </div> */}
          </div>
          <WorkoutModal 
            workoutExercises={this.state.workoutExercises} 
            workoutModalStatus={this.state.workoutModalStatus} 
            openModal={this.openModal}
            userWorkout={this.props.userWorkout}
          />
          <DeleteWorkoutModal
            modalStatus={this.state.deleteWorkoutModalStatus}
            toggleDeleteModal={this.toggleDeleteModal}
            deleteWorkout={this.props.deleteWorkout}
            userWorkout={this.props.userWorkout}
            workoutExercises={this.state.allWorkoutExercises}
            getWorkoutsByUser={this.props.getWorkoutsByUser}
          />
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