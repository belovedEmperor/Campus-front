/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.imageURL && (
          <img 
              src={student.imageURL} 
              alt={`${student.firstname} ${student.lastname}`} 
              style={{ width: '250px', borderRadius: '5px' }} 
          />
      )}
      <p>
          <span style={{fontWeight: 'bold'}}>Email:</span> {student.email}
      </p>
      <p>
          <span style={{fontWeight: 'bold'}}>GPA:</span> {student.gpa}
      </p>

      
      <h3>
          <span style={{fontWeight: 'bold'}}>Campus: </span> 
          {student.campus ? (
              // If student is assigned to a campus, link to the Single Campus View
              <Link to={`/campus/${student.campus.id}`}>
                  {student.campus.name}
              </Link>
          ) : (
              "No campus assigned"
          )}
  </h3>
      <Link to={`/edit-student/${student.id}`}>
          <button style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
          }}>
            Edit Student Information
          </button>
      </Link>
    </div>
  );

};

export default StudentView;