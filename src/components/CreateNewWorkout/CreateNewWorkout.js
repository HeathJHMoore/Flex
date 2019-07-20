import React from 'react';

import './CreateNewWorkout.scss';

import NewWorkoutTable from '../NewWorkoutTable/NewWorkoutTable';

class CreateNewWorkout extends React.Component {

  render() {
    return (
      <div className="col-12 mt-2">
          <div className="row justify-content-center mb-2">
            <label for="newWorkoutName" className="col-8 col-sm-5 col-lg-4 text-center">Workout Name</label>
          </div>
          <div className="row justify-content-center mb-3">
            <input type="text" placeholder="Enter Workout Name Here" id="newWorkoutName" className="col-8 col-sm-5 col-lg-4 text-center"></input>
          </div>
          <div className="row justify-content-center mb-2">
            <button className="btn actionButton">Add An Exercise</button>
          </div>

      </div>
    )
  }
}

export default CreateNewWorkout;