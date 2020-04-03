const router = require("express").Router();
const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Matches with "/users"
// router
//   .route("/")
//   .post(userController.create)
//   .get(userController.findAll);

// // Matches with "/users/:id"
// router
//   .route("/:id")
//   .get(userController.findById)
//   .put(userController.update);
// .delete(userController.remove);

// get all users
router.get("/", async (req, res) => {
  // /users
  try {
    const results = await db.RegisterModel.findAll({});
    if (Array.isArray(results) && results.length) {
      res
        .status(200)
        .send(results)
    } else {
      return res
        .status(404)
        .send("users array not found");
    }
  } catch (error) {
    res
      .status(500)
      .send("error occurred");
    throw error;
  }
});

// user update
router.put("/:id", async (req, res) => {
  // /users/:id
  try {
    // const condition = `id = ${request.params.id}`;
    console.log(request.body);
    const results = await db.RegisterModel.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        email: req.body.email,
      },
      { where: { id: request.params.id } }
    );
    if (results) {
      res
        .status(201)
        .json(results);
    } else {
      res
        .status(404)
        .send("id not found, bio not updated");
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send("error occurred");
      throw error;
    }
  }
});

// user delete
router.delete("/:id", async (req, res) => {
  // /users/:id
  try {
    console.log(req.body);
    const trashed = await db.RegisterModel.remove({ where: { id: req.params.id } });
    if (trashed) {
      res
        .status(203)
        .json(trashed);
    } else {
      res
        .status(404)
        .send("user account not deleted");
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send(`error occurred ${error}`);
      throw error;
    }
  }
});

// user register
router.post("/register", async (req, res) => {
  // /users/register
  const { firstName, lastName, email, password } = req.body;
  const encryptedPW = await hashPW(password);
  console.log("the secret code", encryptedPW);
  db.RegisterModel.create({ firstName, lastName, email, password: encryptedPW })
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(error => console.log("this is a register error", error));
});

// user login
router.post("/login", (req, res) => {
  // /users/login
  const { username, password } = req.body;
  console.log(password);
  db.RegisterModel.findOne({ email: username })
    .then(dbModel => {
      const validPW = pwCheck(password, dbModel.password);
      if (validPW) {
        const user = { ...dbModel._doc };
        delete user["password"];
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        console.log(dbModel);
        res.json({ user, accessToken: accessToken });
      }
    })
    .catch(err => console.log("err here", err));
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // token portion of bearer token
  // if authHeader then return authHeader token portion else undefined
  const token = authHeader && authHeader.split(", ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next;
  });
}
console.log(authenticateToken);


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
async function pwCheck(password, hash) {
  const isValid = await bcryptjs.compare(password, hash);
  return isValid;
}

module.exports = router;

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
