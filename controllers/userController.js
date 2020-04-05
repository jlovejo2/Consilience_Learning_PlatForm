const router = require("express").Router();
const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const IDfunctions = require('./functions');
require("dotenv").config();

// get all users
router.get("/", authenticateToken, async (req, res) => {
    // /users
    try {
        const results = await db.RegisterModel.find({});
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
    let generatedId = '';
    const { type, firstName, lastName, email, password, discipline } = req.body;

    //This was added in to check for type of the student in order to direct to the proper ID generating function
    if (type === 'student') {
        generatedId = await IDfunctions.studentIdGenerator(firstName, lastName);
    } else {
        generatedId = await IDfunctions.staffIDGenerator(firstName, lastName, discipline)
    }

    const encryptedPW = await hashPW(password);

    console.log(generatedId);
    console.log("the secret code", encryptedPW);
    db.RegisterModel.create({ type, firstName, lastName, email, password: encryptedPW, ID: generatedId })
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
            console.log("this is the dbModel")
            const validPW = pwCheck(password, dbModel.password);
            if (validPW) {
                const user = { ...dbModel._doc };
                delete user["password"];
                delete user["token"];

                const accessToken = generateAccessToken(user)
                
                let refreshTokens = []
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken)

                try {db.RegisterModel.findByIdAndUpdate(
                  { _id: dbModel._id }, 
                  {$set: { token: accessToken } },
                  { new: true }
                  ).then(accessTokenUpdate => { 
                    console.log("this is access token within findupdate", accessTokenUpdate)
                    accessTokenUpdate.password = '';
                   res.json({ accessTokenUpdate })
                  })
                .catch(error => console.log(error))}
                catch (error) {
                  if (error) console.log(error, "an error occured with try catch")
                }
                console.log({ dbModel, accessToken });
                // res.json({ user, accessToken, refreshToken });
            }
        })
        .catch(err => console.log("err here", err));
});

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



function generateAccessToken (user) {
  // lifespan -> 5-10 hrs
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300m' })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("requesting headers ", req.headers)
    // token portion of bearer token
    // if authHeader then return authHeader token portion else undefined
    console.log("logging the AUTHHEADER ",authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader.split(" ")[1])
    console.log("LOGGING THE TOKEN ", token)
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        console.log("Logging the ERR ",err);
        if (err) return res.sendStatus(403);
        console.log("requesting the user ", req.user )
        // req.user = user;
        console.log(next())
        next();
    }).catch(err => res.status(500).send(err))
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
