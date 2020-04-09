// caseSensitive routing option set to true
// 5x - https://expressjs.com/en/5x/api.html - alpha documentation
// 4x - https://expressjs.com/en/api.html - available v4.16.0 on
const router = require("express").Router({ caseSensitive: true });
const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const IDfunctions = require("./functions");
require("dotenv").config();

// get all users
router.get("/", authenticateToken, async (req, res) => {
  console.log("in this route 13");
  // /users
  try {
    const results = await db.RegisterModel.find({});
    if (Array.isArray(results) && results.length) {
      res.status(200).send(results);
    } else {
      return res.status(404).send("users array not found");
    }
  } catch (error) {
    res.status(500).send("error occurred");
    throw error;
  }
});
// check token
router.get("/checkToken", authenticateToken, (req, res) => {
  res.sendStatus(200)
});

// get cookie and decode header, payload, and signature via {complete: true}
// then, verify cookie using environmental access token secret 
router.get('/getcookie', (req, res) => {
  const authorization = req.cookies['authorization']
  if (authorization) {
    const decoded = jwt.decode(authorization, { complete: true })
    const verified = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET)
    if (!verified) return false
    console.log("token verified: ", verified)
    console.log("token decoded: ", decoded)
    console.log("cookie content: ", authorization)
    return res.json(decoded)
  }
  return res.send('no cookie found').redirect('/login')
})

// get user authenticated status
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    await db.RegisterModel.findById({ _id: req.params.id }, req.body).then(
      dbModel => {
        if (req.body.type === "teacher" || "student") {
          console.log(`user has a token and a type`);
          const userUpdated = { ...dbModel._doc };
          delete userUpdated["password"];
          console.log({ userUpdated });
          // only return user type
          res.json({ type: userUpdated.type });
        }
      }
    );
  } catch (error) {
    if (error) {
      console.log(error, "please register or login");
    }
  }
});

// user update
router.put("/:id", authenticateToken, async (req, res) => {
  // /users/:id
  try {
    // const condition = `id = ${request.params.id}`;
    console.log(request.body);
    const results = await db.RegisterModel.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        email: req.body.email
      },
      { where: { id: request.params.id } }
    );
    if (results) {
      res.status(201).json(results);
    } else {
      res.status(404).send("id not found, bio not updated");
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send("error occurred");
      throw error;
    }
  }
});

// user delete
router.delete("/:id", authenticateToken, async (req, res) => {
  // /users/:id
  try {
    console.log(req.body);
    const trashed = await db.RegisterModel.remove({
      where: { id: req.params.id }
    });
    if (trashed) {
      res.status(203).json(trashed);
    } else {
      res.status(404).send("user account not deleted");
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send(`error occurred ${error}`);
      throw error;
    }
  }
});

// user register
router.post("/register", async (req, res) => {
  // /users/register
  let generatedId = "";
  const { type, firstName, lastName, email, password, discipline } = req.body;

  //This was added in to check for type of the student in order to direct to the proper ID generating function
  if (type === "Student") {
    generatedId = await IDfunctions.studentIdGenerator(firstName, lastName);
  } else {
    generatedId = await IDfunctions.staffIDGenerator(
      firstName,
      lastName,
      discipline
    );
  }
  const encryptedPW = await hashPW(password);
  console.log(generatedId);
  console.log("the secret code", encryptedPW);
  db.RegisterModel.create({
    type,
    firstName,
    lastName,
    email,
    password: encryptedPW,
    ID: generatedId
  })
    .then(dbModel => {
      console.log(dbModel);
      res.json(dbModel);
    })
    .catch(error => console.log("this is a register error", error));
});

// user login
router.post("/login", (req, res) => {
  // /users/login
  console.log(req.body);
  const { username, password } = req.body;
  db.RegisterModel.findOne({ email: username })
    .then(dbModel => {
      console.log("this is the dbModel");
      const validPW = pwCheck(password, dbModel.password);
      if (validPW) {
        const user = { ...dbModel._doc };
        delete user["password"];
        const accessToken = generateAccessToken(user);
        res.cookie("authorization", accessToken, {
          expires: new Date(Date.now() + "1440m"),
          secure: true, // using https set book to true **IMPORTANT FOR PRODUCTION
          httpOnly: true,
          sameSite: true
        });
        console.log("this is cookie data", accessToken)
        res.set("authorization", accessToken);
        res.json({ user });
      } else {
        res.redirect("/login");
      }
    })
    .catch(err => console.log("err here", err));
});

// user logout
router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500).send("logout error occurred");
  }
});

function generateAccessToken(user) {
  // lifespan -> 604800000 ms = 7 days
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1440m"
  });
}

function authenticateToken(req, res, next) {
  console.log("requesting cookies", req.cookies);
  const authHeader = req.headers["authorization"];
  // token portion of bearer token
  // if authHeader then return authHeader token portion else undefined
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("Logging the ERR ", err);
    if (err) return res.sendStatus(403);
    // req.user = user;
    console.log(user);
    next();
  });
}

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

// get cookie and verify token
// router.get('/getcookieauth', (req, res, next) => {
//   const authorization = req.cookies['authorization']
//   if (authorization === null) return res.sendStatus(401);
//   jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log("Logging the ERR ", err);
//     if (err) return res.sendStatus(403);
//     // req.user = user;
//     console.log(user);
//     next()
//   });
// })

// router.post("/refresh", (req, res, next) => {
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1440m" })
// })
// https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
// function endpoint (user, cookie, res) {
//         let refreshTokens = []
//         const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//         refreshTokens.push(refreshToken)
// }

// COOKIES!!!!!
// function generateAccessToken (user, res) {
//   // lifespan -> 12 hrs; 604800000 ms = 7 days
//   const expiration = 604800000;
//   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiration })
//   return res.cookie('token', token, {
//     expires: new Date(Date.now() + expiration),
//     secure: false, // using https set bool to true **IMPORTANT FOR PRODUCTION
//     httpOnly: true,
//     sameSite: true
//   })
// }

// async function authenticateToken(req, res, next) {
//     const authHeader = req.headers["authorization"]
//     console.log("requesting headers ", req.headers)
//     // token portion of bearer token
//     // if authHeader then return authHeader token portion else undefined
//     console.log("logging the AUTHHEADER ",authHeader)
//     // const token = authHeader && authHeader.split(" ")[1];
//     const token = req.cookie.token || ''
//     try {
//     console.log(authHeader.split(" ")[1])
//     console.log("LOGGING THE TOKEN ", token)
//     if (token === null) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         console.log("Logging the ERR ",err);
//         if (err) return res.sendStatus(403);
//         console.log("requesting the user ", req.user )
//         // req.user = user;
//         console.log(next())
//         next();

//     })
// }
// catch (err) {
//   return res.status(500).json(err.toString())
// }
// }

// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403)
//       const accessToken = generateAccessToken({ name: user.name })
//       res.json({ accessToken: accessToken })
//   })
// })

// app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })
