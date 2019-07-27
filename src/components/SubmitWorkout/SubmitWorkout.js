import React from 'react';

import exerciseData from '../../helpers/data/exerciseData';

class SubmitWorkout extends React.Component {
  state = {
    currentWorkout : this.props.match.params.workoutId
  }

  componentDidMount() {

  }

  render() {
    return (
      <h1>{this.state.currentWorkout}</h1>
    )
  }
}

export default SubmitWorkout;