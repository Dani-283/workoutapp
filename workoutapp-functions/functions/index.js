const functions = require("firebase-functions");
const { db } = require("./utility/admin");
const express = require("express");
const app = express();

const {
  getWorkouts,
  postWorkout,
  getWorkout,
  addExercise,
  deleteWorkout,
} = require("./handlers/workouts");
const {
  signup,
  login,
  profileImg,
  getUserDetails,
} = require("./handlers/users");
const auth = require("./utility/auth");

let path =
  "set GOOGLE_APPLICATION_CREDENTIALS=D:Faks\4.GodinaNew folderNWTProjektworkout app-19debafd5476.json";

const firebase = require("firebase");
const { ResultStorage } = require("firebase-functions/lib/providers/testLab");

//workout routes
//get workouts
app.get("/workouts", getWorkouts);
//posting a workout
app.post("/workout", auth, postWorkout);
app.get("/workout/:workoutId", getWorkout);
app.post("/workout/:workoutId/exercise", auth, addExercise);
app.delete("/workout/:workoutId", auth, deleteWorkout);

//user routes
//signup, login routes
app.post("/signup", signup);
app.post("/login", login);
//profile image
app.post("/user/image", auth, profileImg);
app.get("/user", auth, getUserDetails);
exports.api = functions.region("europe-west3").https.onRequest(app);

exports.onWorkoutDelete = functions
  .region("europe-west3")
  .firestore.document("/workouts/{workoutId}")
  .onDelete((snapshot, context) => {
    const workoutId = context.params.workoutId;
    const batch = db.batch();
    return db
      .collection("exercises")
      .where("workoutId", "==", workoutId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/exercises/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
