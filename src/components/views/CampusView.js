/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus } = props;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => props.removeStudentFromCampus(student.id)}>
              Remove
            </button>
          </div>
        );
      })}

      <div>
        <h3>Add a student to this campus:</h3>
        <select
          value={props.selectedStudentId || ""}
          onChange={(e) => props.setSelectedStudentId(e.target.value)}
        >
          <option value="">Select a student</option>
          {props.allStudents
            .filter(s => !s.campusId || s.campusId !== props.campus.id)
            .map(s => (
              <option key={s.id} value={s.id}>
                {s.firstname} {s.lastname}
              </option>
            ))}
        </select>
        <button
          onClick={() => {
            if (props.selectedStudentId)
              props.addStudentToCampus(props.selectedStudentId);
          }}
        >
          Add Student
        </button>
      </div>
    </div>
  );
};



export default CampusView;
