import { Link } from "react-router-dom";

const CampusView = ({
  campus,
  allStudents,
  selectedStudentId,
  setSelectedStudentId,
  addStudentToCampus,
  removeStudentFromCampus
}) => {
  if (!campus || !campus.id) {
    return <h1>Loading campus data...</h1>;
  }

  const students = campus.students || [];

  const renderAddStudentForm = () => (
    <div>
      <h3>Add a student to this campus:</h3>
      <select
        value={selectedStudentId || ""}
        onChange={(e) => setSelectedStudentId(e.target.value)}
      >
        <option value="">Select a student</option>
        {allStudents
          .filter((s) => !s.campusId || s.campusId !== campus.id)
          .map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstname} {s.lastname}
            </option>
          ))}
      </select>
      <button
        onClick={() => {
          if (selectedStudentId) addStudentToCampus(selectedStudentId);
        }}
      >
        Add Student
      </button>
    </div>
  );

  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {campus.imageUrl && (
        <img
          src={campus.imageUrl}
          alt={campus.name}
          style={{ width: "300px", borderRadius: "5px" }}
        />
      )}

      {students.length === 0 ? (
        <>
          <h3>No students enrolled at this campus.</h3>
          {renderAddStudentForm()}
        </>
      ) : (
        <>
          <h3>Enrolled Students:</h3>
          {students.map((student) => (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{student.firstname} {student.lastname}</h2>
              </Link>
              <button onClick={() => removeStudentFromCampus(student.id)}>
                Remove
              </button>
            </div>
          ))}
          <hr />
          {renderAddStudentForm()}
        </>
      )}
    </div>
  );
};

export default CampusView;
