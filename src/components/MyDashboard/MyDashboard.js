import React from 'react';
import { Link } from 'react-router-dom';

import MyWorkouts from '../MyWorkouts/MyWorkouts';

class MyDashboard extends React.Component {
   render() {
    return (
      // <div className="text-center">
      // <Link className="btn btn-danger mt-2 actionButton" to="/CreateNewWorkout">Create A New Workout</Link>
      // <MyWorkouts />
      // </div>
      <div className="col-12 text-center">
      <Link className="btn btn-danger mt-2 actionButton" to="/CreateNewWorkout">Create A New Workout</Link>
      <MyWorkouts />
      </div>
    )
  }
}

export default MyDashboard;