import React from 'react';
import { Link } from 'react-router-dom';

import MyWorkouts from '../MyWorkouts/MyWorkouts';

class MyDashboard extends React.Component {
   render() {
    return (
      <div>
      <Link className="btn btn-danger" to="/CreateNewWorkout">Create A New Workout</Link>
      <MyWorkouts />
      </div>
    )
  }
}

export default MyDashboard;