import React from 'react';

import exerciseData from '../../helpers/data/exerciseData';

class Workout extends React.Component {

  state = {
    workoutExercises : ''
  }

  componentDidMount() {
    console.error('hey from mount')
    exerciseData.getExercisesByWorkoutId(this.props.userWorkout.id)
      .then((workoutExercises) => {
        console.error(workoutExercises, 'look here please');
        const newWorkoutExercises = [...workoutExercises];
        this.setState({workoutExercises : newWorkoutExercises});
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <p>This is A Workout</p>
    )
  }
}

export default Workout;