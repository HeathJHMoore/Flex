import React from 'react';

import exerciseData from '../../helpers/data/exerciseData';
import SubmitExerciseRow from '../SubmitExerciseRow/SubmitExerciseRow';

class SubmitWorkout extends React.Component {
  state = {
    currentWorkout : this.props.match.params.workoutId,
    currentExercises : []
  }

  componentDidMount() {
    exerciseData.getExercisesByWorkoutId(this.state.currentWorkout)
      .then((resp) => {
        const currentExercises = resp.filter(exercise => exercise.isCurrent === true)
        this.setState({currentExercises : currentExercises})
      })
      .catch(err => console.error('error from submitworkout', err))
  }

  render() {

    const exerciseRows = this.state.currentExercises.map((exercise) => (
      <SubmitExerciseRow exercise={exercise}/>
    ))

    return (
        <div className="col-12 col-md-8 col-lg-6">{exerciseRows}</div>
    )
  }
}

export default SubmitWorkout;