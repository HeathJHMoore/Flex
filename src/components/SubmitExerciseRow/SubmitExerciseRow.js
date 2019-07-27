import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import './SubmitExerciseRow.scss';


class SubmitExerciseRow extends React.Component {

  state = {
    isCollapseOpen : false,
    rotate : false
  }

  collapseToggle = () => this.setState({isCollapseOpen : !this.state.isCollapseOpen, rotate: !this.state.rotate})

  arrowClickEvent = (e) => {
    clickedArrow = e.target;
    
  }

  render() {
    const exercise = this.props.exercise;
    const rotateClass = this.state.rotate;
    return (
      <div className="row p-2 ml-1 mr-1 submitExerciseRowContainer">
        <p className="col-6 my-auto">Exercise {exercise.order}: {exercise.name}</p>
        <i className="fas fa-arrow-down arrow col-6 text-right my-auto pr-4" onClick={this.collapseToggle}></i>
        <Collapse isOpen={this.state.isCollapseOpen}>
          
              Anim pariatur cliche reprehenderit,
              enim eiusmod high life accusamus terry richardson ad squid. Nihil
              anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident.
           
        </Collapse>
      </div>
    )
  }
}

export default SubmitExerciseRow;
