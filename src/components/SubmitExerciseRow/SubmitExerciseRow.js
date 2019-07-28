import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import './SubmitExerciseRow.scss';


class SubmitExerciseRow extends React.Component {

  state = {
    isCollapseOpen : false
  }

  collapseToggle = () => this.setState({isCollapseOpen : !this.state.isCollapseOpen})

  render() {
    const exercise = this.props.exercise;
    const rotateClass = this.state.rotate;
    return (
      <div className="row p-2 ml-1 mr-1 submitExerciseRowContainer">
        <p className="col-6 my-auto">Exercise {exercise.order}: {exercise.name}</p>
        <i className="fas fa-arrow-down arrow col-6 text-right my-auto pr-4" onClick={this.collapseToggle}></i>
        <Collapse isOpen={this.state.isCollapseOpen} className="col-12">
          <div className="row justify-content-around mt-3">
            <div className="col-4">
              <div className="row justify-content-center text-center">
                Prescribed Repetitions
              </div>
              <div className="row justify-content-center">
                {exercise.repetitions}
              </div>
            </div>
            <div className="col-4">
              <div className="row justify-content-center text-center">
                Prescribed Weight
              </div>
              <div className="row justify-content-center">
                {exercise.weight}
              </div>
            </div>
          </div> 
          <div className="row mt-4 text-center justify-content-center">
            <h5 className='text-center'>Completed Repetitions</h5>
          </div>
          <div className="row mt-2">
            <div className="col-5 text-center my-auto">
              Set 1
            </div>
            <div className="col-7">
              <input className="form-control" placeholder="ex. 8" type="number"></input>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-5 text-center my-auto">
              Set 2
            </div>
            <div className="col-7">
              <input className="form-control" placeholder="ex. 8" type="number"></input>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-5 text-center my-auto">
              Set 3
            </div>
            <div className="col-7">
              <input className="form-control" placeholder="ex. 8" type="number"></input>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default SubmitExerciseRow;
