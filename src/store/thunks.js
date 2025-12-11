import * as ac from "./actions/actionCreators"; // Import Action Creators
const axios = require("axios");

// ---------------------- CAMPUS THUNKS ----------------------

// All Campuses
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/campuses`);
    dispatch(ac.fetchAllCampuses(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Single Campus
export const fetchCampusThunk = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Delete Campus
export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.error(err);
  }
};

// Add Campus
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    let res = await axios.post(`/api/campuses`, campus);
    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Edit Campus
export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(ac.editCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

// ---------------------- STUDENT THUNKS ----------------------

// All Students
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/students`);
    dispatch(ac.fetchAllStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Single Student
export const fetchStudentThunk = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/students/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Add Student
export const addStudentThunk = (student) => async (dispatch) => {
  try {
    let res = await axios.post(`/api/students`, student);
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Delete Student
export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(ac.deleteStudent(studentId));
  } catch (err) {
    console.error(err);
  }
};

// Edit Student
export const editStudentThunk = (student) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/students/${student.id}`, student);
    dispatch(ac.editStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};
