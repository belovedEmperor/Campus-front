import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: "500px",
    backgroundColor: "#f0f0f5",
    borderRadius: "5px",
    margin: "auto",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    textDecoration: "none",
  },
  customizeAppBar: {
    backgroundColor: "#11153e",
    shadows: ["none"],
  },
  formTitle: {
    backgroundColor: "#c5c8d6",
    marginBottom: "15px",
    textAlign: "center",
    borderRadius: "5px 5px 0px 0px",
    padding: "3px",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
  },
}));

const EditCampusView = (props) => {
  const { handleChange, handleSubmit, errors, formData } = props;
  const classes = useStyles();

  return (
    <div>
      <h1>Edit Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Courier, sans-serif",
                fontSize: "20px",
                color: "#11153e",
              }}
            >
              Edit a Campus
            </Typography>
          </div>

          <form
            style={{ textAlign: "center" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* Name */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <div className={classes.errorText}>{errors.name}</div>
            )}
            <br />
            <br />

            {/* Address */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Address:{" "}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
            />
            {errors.address && (
              <div className={classes.errorText}>{errors.address}</div>
            )}
            <br />
            <br />

            {/* Description */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <div className={classes.errorText}>{errors.description}</div>
            )}
            <br />
            <br />

            {/* Image URL */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Image URL:{" "}
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl || ""} // <- add this
              onChange={(e) => handleChange(e)}
              placeholder="Enter image URL"
            />

            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCampusView;
