import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import './SubmitExerciseRow.scss';


class SubmitExerciseRow extends React.Component {

  state = {
    exercise : {},
    isCollapseOpen : false,
    isPageLoad : true,
    isSaved : false,
    set1 : '',
    set2 : '',
    set3 : '',
    arrowClassName : 'fas fa-arrow-down arrow col-1 text-right my-auto'
  }

  componentDidMount() {
    this.setState({exercise : this.props.exercise})
  }

  arrowContainerClass = () => {
   if (!this.state.isCollapseOpen) {
      this.setState({arrowClassName : "fas fa-arrow-down rotateArrowUp col-1 text-right my-auto"})
    } else if (this.state.isCollapseOpen) {
      this.setState({arrowClassName : "fas fa-arrow-down arrow col-1 text-right my-auto"})
    }
  }

  collapseToggle = () => {
    this.setState({isCollapseOpen : !this.state.isCollapseOpen, isPageLoad : false})
    this.arrowContainerClass();
  }

  saveExercisePerformance = () => {
    const set1 = document.getElementById(this.state.exercise.id + '1').value;
    const set2 = document.getElementById(this.state.exercise.id + '2').value;
    const set3 = document.getElementById(this.state.exercise.id + '3').value;
    const completedRepetitions = `${set1}-${set2}-${set3}`;
    const updateExerciseRepetitions = this.props.updateExerciseRepetitions;
    updateExerciseRepetitions(this.state.exercise.id, completedRepetitions);
    this.collapseToggle();
    this.setState({isSaved : true})
  }

  set1State = (e) => {
    const setValue = e.target.value
    this.setState({set1 : setValue})
  }
  set2State = (e) => {
    const setValue = e.target.value
    this.setState({set2 : setValue})
  }
  set3State = (e) => {
    const setValue = e.target.value
    this.setState({set3 : setValue})
  }

  render() {
    const exercise = this.props.exercise;
    const rotateClass = this.state.rotate;
    const input1 = this.state.exercise.id + '1'
    const input2 = this.state.exercise.id + '2'
    const input3 = this.state.exercise.id + '3'
    const exerciseRowContainerClass = () => {
      let containerClassName = '';
      let arrowClassName = ''
      if (this.state.isPageLoad) {
        containerClassName = 'row justify-content-between pb-1'
        arrowClassName = 'fas fa-arrow-down arrow col-1 text-right my-auto'
      } else if (this.state.isCollapseOpen) {
        containerClassName = 'row justify-content-between hvr-underline-from-center pb-1'
        arrowClassName = 'fas fa-arrow-down rotateArrowUp col-1 text-right my-auto'
      } else if (!this.state.isCollapseOpen) {
        containerClassName = 'row justify-content-between hvr-underline-from-center-away pb-1'
        arrowClassName = 'fas fa-arrow-down arrow col-1 text-right my-auto'
      }
      return containerClassName
    }
    // const arrowContainerClass = () => {
    //   let arrowClassName = ''
    //   if (this.state.isPageLoad) {
    //     arrowClassName = "fas fa-arrow-down arrow col-1 text-right my-auto"
    //   } else if (this.state.isCollapseOpen) {
    //     arrowClassName = "fas fa-arrow-down rotateArrowUp col-1 text-right my-auto"
    //   } else if (!this.state.isCollapseOpen) {
    //     arrowClassName = "fas fa-arrow-down arrow col-1 text-right my-auto"
    //   }
    //   return arrowClassName
    // }
    // this.state.isCollapseOpen ? 'row justify-content-between hvr-underline-from-center pb-1' : 'row justify-content-between hvr-underline-from-center-away pb-1'
    return (
      <div className="row p-2 ml-1 mr-1 submitExerciseRowContainer bg-white">
        <div className="col-12">
          <div className={exerciseRowContainerClass()}>
            <p className="col-9 my-auto exerciseName">Exercise {exercise.order}: {exercise.name}</p>
            {this.state.isSaved ? <i class="fas fa-check-square col-1 my-auto"></i> : ''}
            <i onClick={this.collapseToggle} className={this.state.arrowClassName}></i>
            {/* {this.isCollapseOpen 
              ? <i onClick={this.collapseToggle} className="fas fa-arrow-down rotateArrowUp col-1 text-right my-auto"></i>
              : <i onClick={this.collapseToggle} className="fas fa-arrow-down arrow col-1 text-right my-auto"></i>
              } */}
          </div>
        </div>
        <Collapse isOpen={this.state.isCollapseOpen} className="col-12">
          <div className="row justify-content-around mt-3">
            <div className="col-4">
              <div className="row justify-content-center text-center bg-dark submitExerciseHeaders">
                Prescribed Repetitions
              </div>
              <div className="row justify-content-center submitExerciseNumbers">
                {exercise.repetitions}
              </div>
            </div>
            <div className="col-4">
              <div className="row justify-content-center text-center bg-dark submitExerciseHeaders">
                Prescribed Weight
              </div>
              <div className="row justify-content-center submitExerciseNumbers">
                {exercise.weight}
              </div>
            </div>
          </div> 
          <div className="row mt-4 text-center justify-content-center">
            <h5 className='text-center border-bottom border-dark'>Completed Repetitions</h5>
          </div>
          <div className="row mt-3">
            <div className="col-5 text-center my-auto">
              <strong>Set 1</strong>
            </div>
            <div className="col-7">
              <input id={input1} className="form-control" placeholder="ex. 8" type="number" onChange={this.set1State}></input>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 text-center my-auto">
              <strong>Set 2</strong>
            </div>
            <div className="col-7">
              <input id={input2} className="form-control" placeholder="ex. 8" type="number" onChange={this.set2State}></input>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 text-center my-auto">
              <strong>Set 3</strong>
            </div>
            <div className="col-7">
              <input id={input3} className="form-control" placeholder="ex. 8" type="number" onChange={this.set3State}></input>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-2">
            {
              this.state.set1 !== ''
              && this.state.set2 !== ''
              && this.state.set3 !== ''
              ? <button className="btn actionButton col-6 col-md-5"onClick={this.saveExercisePerformance}>Save</button>
              : <button className="btn actionButton col-6 col-md-5"onClick={this.saveExercisePerformance} disabled>Save</button>
            }
              {/* <button className="btn btn-danger actionButton col-6 col-md-5"onClick={this.saveExercisePerformance}>Save</button> */}
          </div>
        </Collapse>
      </div>
    )
  }
}

export default SubmitExerciseRow;
