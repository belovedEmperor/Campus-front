/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
================================================== */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
            gpa: 0.0,
            campusId: null,
            errors: {},
            redirect: false,
            redirectId: null
        };
    }

    // Fetch data and initialize state with props
    componentDidMount() {
        this.props.fetchStudent(this.props.match.params.id);
    }

    // Use prop data to pre-fill state once fetched
    componentDidUpdate(prevProps) {
        if (prevProps.student !== this.props.student && this.props.student.id) {
            const student = this.props.student;
            this.setState({
                id: student.id,
                firstname: student.firstname || '',
                lastname: student.lastname || '',
                email: student.email || '',
                imageURL: student.imageURL || '',
                gpa: student.gpa !== null ? student.gpa : 0.0,
                campusId: student.campusId || null,
            });
        }
    }

    // Helper function for validation
    validate = (data) => {
        const newErrors = {};
        
        // Validation: Required fields
        if (!data.firstname) newErrors.firstname = "First name is required.";
        if (!data.lastname) newErrors.lastname = "Last name is required.";
        if (!data.email) newErrors.email = "Email is required.";
        
        // Validation: Email format
        if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Email address is invalid.";
        }

        // Validation: GPA (0.0 to 4.0)
        const gpa = parseFloat(data.gpa);
        if (isNaN(gpa) || gpa < 0.0 || gpa > 4.0) {
            newErrors.gpa = "GPA must be a number between 0.0 and 4.0.";
        }
        
        return newErrors;
    };

    // Handle input change with real-time validation
    handleChange = (event) => {
        const { name, value } = event.target;
        
        const updatedState = { ...this.state, [name]: value };

        // Real-time validation
        const validationErrors = this.validate(updatedState);
        
        this.setState({
            [name]: value,
            errors: validationErrors
        });
    }

    // Handle form submission
    handleSubmit = async (event) => {
        event.preventDefault();
        
        // Final validation check before submit
        const finalErrors = this.validate(this.state);
        this.setState({ errors: finalErrors });

        // Stop submission if errors exist
        if (Object.keys(finalErrors).length > 0) return;

        let student = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            imageURL: this.state.imageURL || null,
            gpa: this.state.gpa,
            campusId: this.state.campusId || null,
        };

        // Dispatch the edit thunk
        await this.props.editStudent(student);

        // Redirect to the updated student's page
        this.setState({
            redirect: true,
            redirectId: this.state.id
        });
    }

    componentWillUnmount() {
        this.setState({ redirect: false, redirectId: null });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/student/${this.state.redirectId}`} />);
        }
        
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

// Map state and dispatch to props
const mapState = (state) => {
    return {
        student: state.student,
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);