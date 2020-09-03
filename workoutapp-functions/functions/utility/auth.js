const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  let tokenId;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    tokenId = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token");
    return res.status(403).json({ error: "Unauthorized post" });
  }
  //adding decodedToken to request so that every req after has that added user data
  admin
    .auth()
    .verifyIdToken(tokenId)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      req.user.imgUrl = data.docs[0].data().imgUrl;
      return next();
    })
    .catch((err) => {
      console.error("Token verification error", err);
      return res.status(403).json(err);
    });
};
