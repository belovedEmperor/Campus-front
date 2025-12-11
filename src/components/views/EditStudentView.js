/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the 
corresponding Container component. It constructs a React component to display 
the edit student form.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for error messages
const errorStyle = {
  color: 'red',
  fontSize: '14px',
  marginTop: '5px',
  marginBottom: '10px',
  display: 'block'
};

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
    padding: '10px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'center',
  },
  errorText: {
    ...errorStyle,
  }
}));

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, errors, student } = props;
  const classes = useStyles();

  // Render the Edit Student form view
  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Update Student Details
            </Typography>
          </div>
          
          {/* Form starts here */}
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            
            {/* --- FIRST NAME --- */}
            <div className={classes.inputGroup}>
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
              <input type="text" name="firstname" onChange={handleChange} value={student.firstname} />
              {errors.firstname && <span className={classes.errorText}>{errors.firstname}</span>}
            </div>

            {/* --- LAST NAME --- */}
            <div className={classes.inputGroup}>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
              <input type="text" name="lastname" onChange={handleChange} value={student.lastname} />
              {errors.lastname && <span className={classes.errorText}>{errors.lastname}</span>}
            </div>

            {/* --- EMAIL --- */}
            <div className={classes.inputGroup}>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
              <input type="email" name="email" onChange={handleChange} value={student.email} />
              {errors.email && <span className={classes.errorText}>{errors.email}</span>}
            </div>

            {/* --- IMAGE URL --- */}
            <div className={classes.inputGroup}>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
              <input type="text" name="imageURL" onChange={handleChange} value={student.imageURL} />
            </div>

            {/* --- GPA --- */}
            <div className={classes.inputGroup}>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA (0.0-4.0): </label>
              <input type="number" name="gpa" step="0.1" min="0.0" max="4.0" onChange={handleChange} value={student.gpa} />
              {errors.gpa && <span className={classes.errorText}>{errors.gpa}</span>}
            </div>

            {/* --- CAMPUS ID --- */}
            <div className={classes.inputGroup}>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus ID: </label>
              <input type="text" name="campusId" onChange={handleChange} value={student.campusId || ''} />
            </div>
            
            <Button variant="contained" color="primary" type="submit">
              Update Student
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default EditStudentView;