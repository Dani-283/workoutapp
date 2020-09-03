const { db, admin } = require("../utility/admin");
const { emptyString, emailCheck } = require("../utility/helpers");

const config = require("../utility/config");
const { uuid } = require("uuidv4");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPass: req.body.confirmPass,
    handle: req.body.handle,
  };

  let errors = {};

  if (emptyString(newUser.email)) {
    errors.email = "Email empty";
  } else if (!emailCheck(newUser.email)) {
    errors.email = "Not a valid email";
  }

  if (emptyString(newUser.password)) errors.password = "Password empty";
  if (newUser.password !== newUser.confirmPass)
    errors.confirmPass = "Password doesn't match";
  if (emptyString(newUser.handle)) errors.handle = "Handle empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const noImg = "no-img.png";

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "handle taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((tokenId) => {
      token = tokenId;
      const userCred = {
        handle: newUser.handle,
        email: newUser.email,
        date: new Date().toISOString(),
        imgUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCred);
    })
    .then((data) => {
      return res.status(200).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use")
        return res.status(400).json({ email: "Email taken" });
      else
        return res
          .status(500)
          .json({ general: "Something went wrong, Try again" });
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};
  // const { valid, errors } = validateLoginData(user);
  if (emptyString(user.email)) errors.email = "email empty";
  if (emptyString(user.password)) errors.password = "passwor empty9";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);

      return res.status(403).json({ general: "Wrong password" });
    });
};

//uploading profile image
exports.profileImg = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imgFileName;
  let imgForUpload = {};
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname);
    console.log(filename);
    console.log(mimetype);

    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong type" });
    }
    const imageEx = filename.split(".")[1];
    imgFileName = `${Math.round(Math.random() * 1000)}.${imageEx}`;
    const filePath = path.join(os.tmpdir(), imgFileName);
    imgForUpload = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(`${config.storageBucket}`)
      .upload(imgForUpload.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imgForUpload.mimetype,
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imgFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imgUrl });
      })
      .then(() => {
        return res.json({ message: "Upload successfull" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
};

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
      }
      console.log(userData);
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
