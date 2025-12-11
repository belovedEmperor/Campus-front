/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching,
and passes data (if any) as props to the corresponding View component.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
      imageUrl: '',
      errors: {},
      redirect: false,
    };
  }

  // Handle input changes
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Simple validation function
  validateForm = () => {
    const errors = {};
    if (!this.state.name) errors.name = 'Name is required';
    if (!this.state.address) errors.address = 'Address is required';
    if (!this.state.description) errors.description = 'Description is required';
    // Optional: validate image URL format
    if (
    this.state.imageUrl &&
    !/^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(this.state.imageUrl)
    ) {
    errors.imageUrl = 'Enter a valid image URL';
    }

    return errors;
  }

  // Handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = this.validateForm();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const campus = {
    name: this.state.name,
    address: this.state.address,
    description: this.state.description,
    imageUrl: this.state.imageUrl || null, // <- ensures blank input becomes null
    };


    // Add new campus in backend via thunk
    const newCampus = await this.props.addCampus(campus);

    // Reset form and redirect to new campus
    this.setState({
      name: '',
      address: '',
      description: '',
      imageUrl: '',
      errors: {},
      redirect: true,
    });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

    render() {
    if (this.state.redirect) {
        return <Redirect to="/campuses" />; // redirect to AllCampusesView
    }

    return (
        <div>
        <Header />
        <NewCampusView
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            formData={{
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageUrl: this.state.imageUrl || null,
            }}
        />
        </div>
    );
    }

}

// Only need mapDispatch since we don't read state here
const mapDispatch = (dispatch) => ({
  addCampus: (campus) => dispatch(addCampusThunk(campus)),
});

export default connect(null, mapDispatch)(NewCampusContainer);
