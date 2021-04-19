import {
  SET_WORKOUTS,
  LOADING_DATA,
  DELETE_WORKOUT,
  SET_ERRORS,
  POST_WORKOUT,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_WORKOUT,
  ADD_EXERCISE,
  DELETE_EXERCISE,
} from "../types";
import axios from "axios";

export const getWorkouts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("./workouts")
    .then((res) => {
      dispatch({
        type: SET_WORKOUTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_WORKOUTS,
        payload: [],
      });
    });
};

export const getWorkout = (workoutId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/workout/${workoutId}`)
    .then((res) => {
      dispatch({
        type: SET_WORKOUT,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const updateWorkout = (workoutId, body) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .put(`/workout/${workoutId}`, body)
    .then((res) => {
      dispatch({ type: SET_WORKOUT, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const postWorkout = (newWorkout) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/workout", newWorkout)
    .then((res) => {
      dispatch({
        type: POST_WORKOUT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addExercise = (workoutId, body) => (dispatch) => {
  console.log(body);
  axios
    .post(`/workout/${workoutId}/exercise`, body)
    .then((res) => {
      dispatch({
        type: ADD_EXERCISE,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteExercise = (body) => (dispatch) => {
  console.log(body);
  axios
    .post(`/exercises`, body)
    .then(() => {
      dispatch({
        type: DELETE_EXERCISE,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteWorkout = (workoutId) => (dispatch) => {
  axios
    .delete(`/workout/${workoutId}`)
    .then(() => {
      dispatch({ type: DELETE_WORKOUT, payload: workoutId });
    })
    .catch((err) => console.log(err));
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
