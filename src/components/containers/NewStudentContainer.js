/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      // NEW REQUIRED FIELDS
      email: "",
      gpa: 0.0,
      campusId: null, 
      // NEW STATE FOR VALIDATION
      errors: {},
      redirect: false, 
      redirectId: null
    };
  }
  // Helper function to validate data
  validate = (data) => {
    const newErrors = {};
    
    // 1. REQUIRED FIELD VALIDATION (firstname, lastname, email)
    if (!data.firstname) {
      newErrors.firstname = "First name is required.";
    }
    if (!data.lastname) {
      newErrors.lastname = "Last name is required.";
    }
    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid.";
    }

    // 2. GPA VALIDATION (0.0 to 4.0)
    const gpa = parseFloat(data.gpa);
    if (isNaN(gpa) || gpa < 0.0 || gpa > 4.0) {
      newErrors.gpa = "GPA must be a number between 0.0 and 4.0.";
    }

    return newErrors;
  };

  handleChange = event => {
  const { name, value } = event.target;
      
      // 1. Update the student data portion of the state immediately
  const updatedState = { ...this.state, [name]: value };

      // 2. Validate the updated state
  const validationErrors = this.validate(updatedState);
      
      // 3. Set BOTH the new input value AND the new errors object
  this.setState({
  [name]: value,
   errors: validationErrors
  });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    const finalErrors = this.validate(this.state);
    this.setState({ errors: finalErrors });
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        gpa: this.state.gpa,
        imageURL: this.state.imageURL || null,
        campusId: this.state.campusId || null
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      redirect: true, 
      redirectId: newStudent.id,
      email: "",
      gpa: 0.0,
      imageURL: "",
      errors: {}
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}  
          errors={this.state.errors}
          student={this.state} // Pass the entire student state for displaying current values    
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);