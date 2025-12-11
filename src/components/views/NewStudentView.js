import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: { width: '500px', backgroundColor: '#f0f0f5', borderRadius: '5px', margin: 'auto', padding: '10px' },
  formTitle: { backgroundColor:'#c5c8d6', marginBottom:'15px', textAlign:'center', borderRadius:'5px 5px 0 0', padding:'3px' },
  inputGroup: { marginBottom:'15px', textAlign:'center' },
  errorText: { color:'red', fontSize:'14px', display:'block' }
}));

const NewStudentView = ({ handleChange, handleSubmit, errors, student }) => {
  const classes = useStyles();

  return (
    <div>
      <h1>New Student</h1>
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{ fontWeight:'bold', fontFamily:'Courier, sans-serif', fontSize:'20px', color:'#11153e' }}>Add a Student</Typography>
        </div>
        <form style={{textAlign:'center'}} onSubmit={handleSubmit}>
          <div className={classes.inputGroup}>
            <label>First Name: </label>
            <input type="text" name="firstname" value={student.firstname} onChange={handleChange} />
            {errors.firstname && <span className={classes.errorText}>{errors.firstname}</span>}
          </div>
          <div className={classes.inputGroup}>
            <label>Last Name: </label>
            <input type="text" name="lastname" value={student.lastname} onChange={handleChange} />
            {errors.lastname && <span className={classes.errorText}>{errors.lastname}</span>}
          </div>
          <div className={classes.inputGroup}>
            <label>Email: </label>
            <input type="email" name="email" value={student.email} onChange={handleChange} />
            {errors.email && <span className={classes.errorText}>{errors.email}</span>}
          </div>
          <div className={classes.inputGroup}>
            <label>GPA: </label>
            <input type="number" step="0.1" min="0" max="4" name="gpa" value={student.gpa} onChange={handleChange} />
            {errors.gpa && <span className={classes.errorText}>{errors.gpa}</span>}
          </div>
          <div className={classes.inputGroup}>
            <label>Campus ID: </label>
            <input type="text" name="campusId" value={student.campusId} onChange={handleChange} />
          </div>
          <div className={classes.inputGroup}>
            <label>Image URL: </label>
            <input type="text" name="imageURL" value={student.imageURL} onChange={handleChange} />
          </div>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default NewStudentView;
