import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './NewExerciseRow.scss';

class NewWorkoutTable extends React.Component {

  state = {
    isDropDownOpen : false
  }

  deleteExerciseEvent = () => {
    const deleteExercise = this.props.deleteExercise;
    deleteExercise(this.props.newExercise.tableId);
  }

  editExerciseEvent = () => {
    const editExericse = this.props.editExercise;
    editExericse(this.props.newExercise.tableId);
  }

  rowDropDownToggle = () => {
    this.setState({isDropDownOpen : !this.state.isDropDownOpen})
  }

  render() {
    const {newExercise} = this.props;
    return (
      <div className="row mb-3 p-1">
        <div className="col-4 text-center my-auto bg-secondary border pr-0 pl-0">{newExercise.name}</div>
        <div className="col-3 text-center my-auto bg-secondary border pr-0 pl-0">{newExercise.repetitions}</div>
        <div className="col-3 text-center my-auto bg-secondary border pr-0 pl-0">{newExercise.weight}</div>
        <div className="col-2 d-flex justify-content-start pl-0 pr-1">
          <div className="w-100 d-flex align-items-center justify-content-around">
            <div><i class="fas fa-times deleteCross" onClick={this.deleteExerciseEvent}></i></div>
            <div><i class="fas fa-pen penEdit" onClick={this.editExerciseEvent}></i></div>
          </div>
        </div>
      </div>
      // <tr className="newExerciseRow">
      //       <td className="text-center align-middle">{newExercise.name}</td>
      //       <td className="text-center align-middle">{newExercise.repetitions}</td>
      //       <td className="text-center align-middle">{newExercise.weight} lbs</td>
      //       <td className="createNewBlankSpace"><i class="fas fa-times deleteCross col-6" onClick={this.deleteExerciseEvent}></i><i class="fas fa-pen penEdit col-6" onClick={this.editExerciseEvent}></i></td>
      //       {/* <Dropdown isOpen={this.state.isDropDownOpen} toggle={this.rowDropDownToggle} className="blankSpace newRowDropDown align-middle">
      //         <DropdownToggle caret>
      //         </DropdownToggle>
      //         <DropdownMenu>
      //           <DropdownItem header>Header</DropdownItem>
      //           <DropdownItem>Some Action</DropdownItem>
      //           <DropdownItem disabled>Action (disabled)</DropdownItem>
      //           <DropdownItem divider />
      //           <DropdownItem>Foo Action</DropdownItem>
      //           <DropdownItem>Bar Action</DropdownItem>
      //           <DropdownItem>Quo Action</DropdownItem>
      //         </DropdownMenu>
      //       </Dropdown> */}
      // </tr>
    )
  }
}

export default NewWorkoutTable;