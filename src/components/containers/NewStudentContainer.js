import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      gpa: '',      // keep as string while typing
      campusId: '', // keep as string while typing
      imageURL: '',
      errors: {},
      redirect: false,
      redirectId: null
    };
  }

  validate = (data) => {
    const errors = {};
    if (!data.firstname) errors.firstname = "First name is required.";
    if (!data.lastname) errors.lastname = "Last name is required.";
    if (!data.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email.";

    if (data.gpa !== '') {
      const gpaValue = parseFloat(data.gpa);
      if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4)
        errors.gpa = "GPA must be 0.0 - 4.0.";
    }
    return errors;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prev => {
      const newState = { ...prev, [name]: value };
      return { [name]: value, errors: this.validate(newState) };
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;

    const student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      gpa: this.state.gpa === '' ? 0 : parseFloat(this.state.gpa),
      campusId: this.state.campusId === '' ? null : parseInt(this.state.campusId),
      imageURL: this.state.imageURL || null
    };

    const newStudent = await this.props.addStudent(student);

    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      gpa: '',
      campusId: '',
      imageURL: '',
      errors: {},
      redirect: true,
      redirectId: newStudent.id
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to={`/student/${this.state.redirectId}`} />;

    return (
      <div>
        <Header />
        <NewStudentView
          student={this.state}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student))
});

export default connect(null, mapDispatch)(NewStudentContainer);
