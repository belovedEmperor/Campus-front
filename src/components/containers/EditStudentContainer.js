// src/components/containers/EditStudentContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      imageURL: '',
      gpa: '',
      campusId: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if ((!this.state.id && this.props.student.id) || prevProps.student.id !== this.props.student.id) {
      const s = this.props.student;
      this.setState({
        id: s.id,
        firstname: s.firstname || '',
        lastname: s.lastname || '',
        email: s.email || '',
        imageURL: s.imageURL || '',
        gpa: s.gpa != null ? s.gpa.toString() : '',
        campusId: s.campusId != null ? s.campusId.toString() : ''
      });
    }
  }

  validate = (data) => {
    const errors = {};
    if (!data.firstname) errors.firstname = 'First name is required.';
    if (!data.lastname) errors.lastname = 'Last name is required.';
    if (!data.email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email address is invalid.';

    if (data.gpa !== '') {
      const gpaValue = parseFloat(data.gpa);
      if (isNaN(gpaValue) || gpaValue < 0.0 || gpaValue > 4.0) {
        errors.gpa = 'GPA must be a number between 0.0 and 4.0.';
      }
    }
    return errors;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => {
      const updatedState = { ...prevState, [name]: value };
      return { [name]: value, errors: this.validate(updatedState) };
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const finalErrors = this.validate(this.state);
    this.setState({ errors: finalErrors });
    if (Object.keys(finalErrors).length > 0) return;

    const student = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageURL: this.state.imageURL || null,
      gpa: this.state.gpa === '' ? 0.0 : parseFloat(this.state.gpa),
      campusId: this.state.campusId === '' ? null : parseInt(this.state.campusId)
    };

    await this.props.editStudent(student);
    this.props.history.push(`/student/${this.state.id}`);
  };

  render() {
    return (
      <div>
        <Header />
        <EditStudentView
          student={this.state}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => ({ student: state.student });

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student))
});

export default withRouter(connect(mapState, mapDispatch)(EditStudentContainer));
