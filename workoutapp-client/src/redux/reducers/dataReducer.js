import {
  SET_WORKOUTS,
  LOADING_DATA,
  DELETE_WORKOUT,
  POST_WORKOUT,
  SET_WORKOUT,
  ADD_EXERCISE,
  DELETE_EXERCISE,
} from "../types";

const initialState = {
  workouts: [],
  workout: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
        loading: false,
      };
    case SET_WORKOUT:
      return {
        ...state,
        workout: action.payload,
      };
    case DELETE_WORKOUT:
      let index = state.workouts.findIndex(
        (workout) => workout.workoutId === action.payload
      );
      state.workouts.splice(index, 1);
      return {
        ...state,
      };
    case POST_WORKOUT:
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };
    case ADD_EXERCISE:
      return {
        ...state,
        workout: {
          ...state.workout,
          exercises: [...state.workout.exercises, action.payload],
        },
      };
    case DELETE_EXERCISE:
      // state.workouts.map((workout) =>
      //   workout.exercises.map(
      //     (exercise) => exercise.createdAt === action.payload.createdAt
      //   )
      // );
      let indexEx = state.workout.exercises.findIndex(
        (exercise) => exercise.createdAt === action.payload.createdAt
      );
      state.workout.exercises.map((exercise) => {
        if (exercise.createdAt === action.payload.createdAt)
          console.log(action.payload.createdAt);
      });
      if (indexEx > -1) {
        state.workout.exercises.splice(indexEx, 1);
        console.log(state.workout.exercises);
      }
      return { ...state };
    default:
      return state;
  }
}
