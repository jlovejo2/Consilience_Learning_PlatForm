const router = require("express").Router();
const userController = require("../../controllers/userController");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Matches with "/authenticate/users"
router
  .route("/")
  .post(userController.create)
  .get(userController.findAll);

// Matches with "/authenticate/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update);
// .delete(userController.remove);

router.post("/register", async (req, res) => {
      // /authenticate/users/register
  const { firstName, lastName, email, password } = req.body;
  const encryptedPW = await hashPW(password);
  console.log("the secret code", encryptedPW);
  userController.myMongo
    .create({ firstName, lastName, email, password: encryptedPW })
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(error => console.log("this is a register error", error));
});

router.post("/login", (req, res) => {
      // /authenticate/users/login
  const { username, password } = req.body;
 console.log(password)
  userController.myMongo
    .findOne({ email: username })
    .then(dbModel => {
      const validPW = pwCheck(password, dbModel.password)
      if (validPW) {
      const user = {...dbModel._doc}
      delete user['password'];
      console.log(dbModel)
        res.json(user);
      }
    })
    .catch(err => console.log('err here',err));
  // const user = { name: username }
  // // sign takes payload, what we want to serialize
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // res.json({ accessToken: accessToken })
});

// function authenticateToken (req, res, next) {
// const authHeader = req.headers['authorization']
// // token portion of bearer token
// // if authHeader then return authHeader token portion else undefined
// const token = authHeader && authHeader.split(', ')[1]
// if (token===null) return res.sendStatus(401)
// jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next
// })
// }

//create a middleware using bcryptjs npm to encrypt or "hash" user password in database
//for example, abcd1234 was converted to $2a$10$iaBPnixg3XKs2Nsl6.hM2.hG.dKFKtc.kmFoPspanv2PU8VEQdIEe via hashPW
async function hashPW(pass) {
  try {
    //salt is similar to concept of nonce
    const salt = await bcryptjs.genSalt(10);
    const hashedPW = await bcryptjs.hash(pass, salt);
    return hashedPW;
  } catch (err) {
    console.log("Err in hasPW", err);
    return pass;
  }
}

//using bcrypt library to check if hashed PWs in DB match unhashed user provided PWs
async function pwCheck(password, hash ) {
  const isValid = await bcryptjs.compare(password, hash);
  return isValid;
}

module.exports = router;
