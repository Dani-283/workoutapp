const { db } = require("../utility/admin");

exports.getWorkouts = (req, res) => {
  db.collection("workouts")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let workouts = [];
      data.forEach((doc) => {
        // if (doc.data().userHandle == req.user.handle) {
        workouts.push({
          workoutId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          date: doc.data().date,
        });
      });
      return res.json(workouts);
    })
    .catch((err) => console.error(err));
};

exports.postWorkout = (req, res) => {
  const newWorkout = {
    body: req.body.body,
    userHandle: req.user.handle,
    date: new Date().toISOString(),
    exerciseCount: 0,
  };

  db.collection("workouts")
    .add(newWorkout)
    .then((doc) => {
      const resWorkout = newWorkout;
      resWorkout.workoutId = doc.id;
      res.json(resWorkout);
      // res.json({ message: `document ${doc.id} success` });
    })
    .catch((err) => {
      res.status(500).json({ error: "error" });
      console.error(err);
    });
};

exports.updateWorkout = (req, res) => {
  let updatedWorkout = {};

  // db.doc(`/workouts/${req.params.workoutId}`)
  //   .get({
  //     body: req.body.body,
  //   })
  //   .then((doc) => {
  //     updatedWorkout = doc.data();
  //     return res.json(updatedWorkout);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: err.code });
  //   });
  db.doc(`/workouts/${req.params.workoutId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Workout doesn't exist" });
      }

      doc.ref.update({ body: req.body.body });
      updatedWorkout = doc.data();
      updatedWorkout.body = req.body.body;
      return res.json(updatedWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getWorkout = (req, res) => {
  let workoutData = {};
  db.doc(`/workouts/${req.params.workoutId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Workout not found" });
      }
      workoutData = doc.data();
      workoutData.workoutId = doc.id;
      return db
        .collection("exercises")
        .orderBy("createdAt", "asc")
        .where("workoutId", "==", req.params.workoutId)
        .get();
    })
    .then((data) => {
      workoutData.exercises = [];
      data.forEach((doc) => {
        workoutData.exercises.push(doc.data());
      });
      return res.json(workoutData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.addExercise = (req, res) => {
  console.log(req.body);

  if (req.body.body.trim() == "")
    return res.status(400).json({ error: "Empty exercise" });

  const newExercise = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    workoutId: req.params.workoutId,
    userHandle: req.user.handle,
    weight: req.body.weight,
    reps: req.body.reps,
  };
  db.doc(`/workouts/${req.params.workoutId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Workout doesn't exist" });
      }
      return doc.ref.update({ exerciseCount: doc.data().exerciseCount + 1 });
    })
    .then(() => {
      return db.collection(`exercises`).add(newExercise);
    })
    .then(() => {
      return res.json(newExercise);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteWorkout = (req, res) => {
  const workout = db.doc(`/workouts/${req.params.workoutId}`);
  workout
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Workout doesnt exist" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Not auth" });
      } else {
        return workout.delete();
      }
    })
    .then(() => {
      res.json({ message: "Deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteExercise = (req, res) => {
  console.log(req);
  db.collection("exercises")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        console.log(doc.data().createdAt);
        console.log(req.body.createdAt);
        if (doc.data().createdAt === req.body.createdAt) {
          return doc.ref.delete();
        }
      });
    })
    .then(() => {
      res.json({ message: "Deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
