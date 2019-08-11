import React from 'react';
import { Link } from 'react-router-dom';

import MyWorkouts from '../MyWorkouts/MyWorkouts';
import './MyDashboard.scss';

class MyDashboard extends React.Component {
   render() {
    return (
      // <div className="text-center">
      // <Link className="btn btn-danger mt-2 actionButton" to="/CreateNewWorkout">Create A New Workout</Link>
      // <MyWorkouts />
      // </div>
      <div className="col-12 text-center mt-2">
        <h2 className="dashboardHeader">My Workouts</h2>
        <MyWorkouts/>
        <Link className="btn btn-danger mt-1 actionButton" to="/CreateNewWorkout">Create A New Workout</Link>
      </div>
    )
  }
}

export default MyDashboard;