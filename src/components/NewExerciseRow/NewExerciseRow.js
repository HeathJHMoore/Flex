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
      <tr className="newExerciseRow">
            <td className="text-center align-middle">{newExercise.name}</td>
            <td className="text-center align-middle">{newExercise.repetitions}</td>
            <td className="text-center align-middle">{newExercise.weight} lbs</td>
            <td className="createNewBlankSpace"><i class="fas fa-times deleteCross col-6" onClick={this.deleteExerciseEvent}></i><i class="fas fa-pen penEdit col-6" onClick={this.editExerciseEvent}></i></td>
            {/* <Dropdown isOpen={this.state.isDropDownOpen} toggle={this.rowDropDownToggle} className="blankSpace newRowDropDown align-middle">
              <DropdownToggle caret>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
      </tr>
    )
  }
}

export default NewWorkoutTable;