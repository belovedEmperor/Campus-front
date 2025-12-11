// src/components/containers/StudentContainer.js

import React, { Component } from "react";
import { connect } from "react-redux";
import Header from './Header';
import { fetchStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";

class StudentContainer extends Component {
  // Get student data from back-end database
  componentDidMount() {
    // Getting student ID from URL
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Ensures data is refetched if the URL ID changes
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchStudent(this.props.match.params.id);
    }
  }

  // Render Student view by passing student data as props
  render() {
    return (
      <div>
        <Header />
        <StudentView student={this.props.student} />
      </div>
    );
  }
}

const mapState = (state) => ({
  student: state.student, // Get the state object from reducer "student"
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
});

export default connect(mapState, mapDispatch)(StudentContainer);
