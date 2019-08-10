import React from 'react';

import exerciseData from '../../helpers/data/exerciseData';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

class ExerciseDictionary extends React.Component {

  state = {
    exercises: []
  }

  componentDidMount() {
    exerciseData.getExercises()
      .then((resp) => this.setState({exercises : resp}))
      .catch(console.error('couldnt get exercises'))
  }

  render() {

    const exerciseCards = this.state.exercises.map((exercise) => (
      <ExerciseCard exercise={exercise}/>
    ))

    return (
      <div className="col-12 mt-2">
        <div className="row">
          {exerciseCards}
        </div>
      </div>
    )
  }
}

export default ExerciseDictionary;