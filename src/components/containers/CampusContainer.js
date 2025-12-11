/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, fetchAllStudentsThunk, editStudentThunk } from "../../store/thunks";

import { CampusView } from "../views";

class CampusContainer extends Component {
  constructor(props) { // Initialize state
    super(props);
    this.state = {
      selectedStudentId: ""
    };} 
  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
    this.props.fetchAllStudents(); // Fetch all students for adding to campus
  }
    setSelectedStudentId = (id) => {
    this.setState({ selectedStudentId: id });
  }

  addStudentToCampus = (studentId) => {
    const student = this.props.allStudents.find(s => s.id === parseInt(studentId));
    if (student) {
      this.props.editStudent({ ...student, campusId: this.props.campus.id });
      this.setState({ selectedStudentId: "" }); // reset select
    }
  }

  removeStudentFromCampus = (studentId) => {
    
    const idToFind = parseInt(studentId);
    const student = this.props.allStudents.find(s => s.id === idToFind);
    
    if (student) {
      // Set campusId to null to unenroll the student
      this.props.editStudent({ ...student, campusId: null });
    }
}
  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    if (!this.props.campus || !this.props.campus.id) {
    return <h1>Loading campus data...</h1>;
  }
    return (
      <div>
        <Header />
        <CampusView campus={this.props.campus}
                    allStudents={this.props.allStudents}
                    selectedStudentId={this.state.selectedStudentId}
                    setSelectedStudentId={this.setSelectedStudentId}
                    addStudentToCampus={this.addStudentToCampus}
                    removeStudentFromCampus={this.removeStudentFromCampus}
         />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
     allStudents: state.students, // Get the State object from Reducer "students"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);