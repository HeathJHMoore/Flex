import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import './SubmitExerciseRow.scss';


class SubmitExerciseRow extends React.Component {

  state = {
    exercise : {},
    isCollapseOpen : false
  }

  componentDidMount() {
    this.setState({exercise : this.props.exercise})
  }

  collapseToggle = () => this.setState({isCollapseOpen : !this.state.isCollapseOpen})

  saveExercisePerformance = () => {
    const set1 = document.getElementById(this.state.exercise.id + '1').value;
    const set2 = document.getElementById(this.state.exercise.id + '2').value;
    const set3 = document.getElementById(this.state.exercise.id + '3').value;
    const completedRepetitions = `${set1}-${set2}-${set3}`;
    const updateExerciseRepetitions = this.props.updateExerciseRepetitions;
    updateExerciseRepetitions(this.state.exercise.id, completedRepetitions);
    this.collapseToggle();
  }

  render() {
    const exercise = this.props.exercise;
    const rotateClass = this.state.rotate;
    const input1 = this.state.exercise.id + '1'
    const input2 = this.state.exercise.id + '2'
    const input3 = this.state.exercise.id + '3'
    return (
      <div className="row p-2 ml-1 mr-1 submitExerciseRowContainer">
        <div className="col-12">
          <div className="row border-bottom">
            <p className="col-10 my-auto">Exercise {exercise.order}: {exercise.name}</p>
            <i className="fas fa-arrow-down arrow col-2 text-right my-auto pr-4" onClick={this.collapseToggle}></i>
          </div>
        </div>
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
            <h5 className='text-center border-bottom'>Completed Repetitions</h5>
          </div>
          <div className="row mt-3">
            <div className="col-5 text-center my-auto">
              Set 1
            </div>
            <div className="col-7">
              <input id={input1} className="form-control" placeholder="ex. 8" type="number"></input>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 text-center my-auto">
              Set 2
            </div>
            <div className="col-7">
              <input id={input2} className="form-control" placeholder="ex. 8" type="number"></input>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 text-center my-auto">
              Set 3
            </div>
            <div className="col-7">
              <input id={input3} className="form-control" placeholder="ex. 8" type="number"></input>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-2">
              <button className="btn btn-danger actionButton col-6 col-md-5"onClick={this.saveExercisePerformance}>Save</button>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default SubmitExerciseRow;
