import React from 'react';

import exerciseData from '../../helpers/data/exerciseData';
import workoutData from '../../helpers/data/workoutData';
import SubmitExerciseRow from '../SubmitExerciseRow/SubmitExerciseRow';

class SubmitWorkout extends React.Component {
  state = {
    currentWorkoutId : this.props.match.params.workoutId,
    currentWorkoutInfo : {},
    currentExercises : []
  }

  componentDidMount() {
    exerciseData.getExercisesByWorkoutId(this.state.currentWorkoutId)
      .then((resp) => {
        const currentExercises = resp.filter(exercise => exercise.isCurrent === true)
        this.setState({currentExercises : currentExercises})
      })
      .catch(err => console.error('error from submitworkout', err))
    workoutData.getWorkoutByWorkoutId(this.state.currentWorkoutId)
      .then(resp => this.setState({currentWorkoutInfo : resp}))
      .catch(err => console.error(err))
  }

  updateExerciseRepetitions = (exerciseId, repetitions) => {
    const currentExercises = this.state.currentExercises;
    currentExercises.forEach((exercise) => {
      if (exercise.id === exerciseId) {
        exercise.completedReptitions = repetitions;
      }
    })
    this.setState({currentExercises : currentExercises})
  }

  render() {

    const exerciseRows = this.state.currentExercises.map((exercise) => (
      <SubmitExerciseRow exercise={exercise} updateExerciseRepetitions={this.updateExerciseRepetitions}/>
    ))

    return (
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center my-2">{this.state.currentWorkoutInfo.name}</h2>
          {exerciseRows}
          <div className="row mt-3 justify-content-center text-center">
            <button className="btn btn-danger actionButton col-6 col-md-5">Submit Workout</button>
          </div>
        </div>
    )
  }
}

export default SubmitWorkout;