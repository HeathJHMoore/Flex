import React from 'react';

class SubmitWorkout extends React.Component {
  state = {
    currentWorkout : this.props.match.params.workoutId
  }
  
  render() {
    return (
      <h1>{this.state.currentWorkout}</h1>
    )
  }
}

export default SubmitWorkout;