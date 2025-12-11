import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editCampusThunk, fetchCampusThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";
import Header from "./Header";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      errors: {},
      redirect: false,
    };
  }

  componentDidMount() {
    let campus = this.props.fetchCampus(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    // Only update if:
    // 1. Props changed (prevProps.campus !== this.props.campus)
    // 2. Campus has data (this.props.campus.id exists)
    // 3. We haven't already pre-filled (check if state is still empty)

    if (
      prevProps.campus !== this.props.campus && // Campus prop changed
      this.props.campus.id && // Campus has data
      !this.state.name // State hasn't been populated yet
    ) {
      // Pre-fill the form with campus data
      this.setState({
        name: this.props.campus.name,
        address: this.props.campus.address,
        description: this.props.campus.description,
        imageUrl: this.props.campus.imageUrl || "",
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // This line handles all the fields somehow
    });
  };

  validateForm = () => {
    const errors = {};
    if (!this.state.name) errors.name = "Name is required";
    if (!this.state.address) errors.address = "Address is required";
    if (!this.state.description) errors.description = "Description is required";
    // Optional: validate image URL format
    if (
      this.state.imageUrl &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(this.state.imageUrl)
    ) {
      errors.imageUrl = "Enter a valid image URL";
    }

    return errors;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = this.validateForm();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const campus = {
      id: this.props.match.params.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl || null, // <- ensures blank input becomes null
    };

    // Edit campus via thunk
    await this.props.editCampus(campus);

    // Redirect to new campus
    this.setState({
      errors: {},
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/campuses" />; // redirect to AllCampusesView
    }

    return (
      <div>
        <Header />
        <EditCampusView
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

const mapState = (state) => ({
  campus: state.campus,
});
const mapDispatch = (dispatch) => ({
  editCampus: (campus) => dispatch(editCampusThunk(campus)),
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
});

export default connect(mapState, mapDispatch)(EditCampusContainer);
