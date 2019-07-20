import React from 'react';

class CreateNewWorkout extends React.Component {
  render() {
    return (
      <div className="container">
          <label for="newWorkoutName" className="row text-center">Workout Name</label>
          <input type="text" placeholder="Enter Workout Name Here" id="newWorkoutName" className="row"></input>
          <button className="btn actionButton">Add An Exercise</button>
      </div>
    )
  }
}

export default CreateNewWorkout;