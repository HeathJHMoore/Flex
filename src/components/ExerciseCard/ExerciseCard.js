import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import './ExerciseCard.scss';

class ExerciseCard extends React.Component {

  state = {
    muscleGroupString : ''
  }

  muscleGroupString = () => {
    let muscleGroupString = '';
    this.props.exercise.muscleGroups.forEach((muscle, index) => {
      if (index === (this.props.exercise.muscleGroups.length - 1)) {
        muscleGroupString += `${muscle}`
      } else {
        muscleGroupString += `${muscle}, `
      }
    })
    this.setState({muscleGroupString : muscleGroupString})
  }

  componentDidMount() {
    this.muscleGroupString();
  }

  render() {
    const exercise = this.props.exercise;
    return (
      <div className="col-12 col-md-6 col-lg-4">
        <Card className="shadow pb-2 mb-3 rounded border border-dark">
          <CardBody className="text-light border-bottom border-dark cardBody">
            <CardTitle className="border-bottom border-light cardTitle pb-2">{exercise.name}</CardTitle>
            <CardSubtitle>{this.state.muscleGroupString}</CardSubtitle>
          </CardBody>
          <CardImg src={exercise.image} alt="Card image cap" className="exerciseCardImages"/>
          <a href={exercise.link} target="_blank" className="text-center mt-2">Learn More About This Exercise</a>
        </Card>
      </div>
    )
  }
}

export default ExerciseCard