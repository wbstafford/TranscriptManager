const express = require("express");
const cors = require('cors');
const Db = require('./dboperations.cjs');
const User = require('./user.cjs');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const dboperations = require('./dboperations.cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


//middleware here
router.use((request, response, next) => {
  //console.log("middleware");
  next();
})

//get all users
router.route("/users").get((request, response) => {
  dboperations.getAllUsers().then(result => {
    response.json(result[0]);
  })
})

//get a specified user by id
router.route("/users/:id").get((request, response) => {
  dboperations.getUser(request.params.id).then(result => {
    response.json(result[0]);
  })
})

//verify if an email exists in the system
router.route("/user/:email").get((request, response) => {
  dboperations.getUserByEmail(request.params.email).then(result => {
    if (result.length > 0) {
      response.json(result[0]);
    } else {
      response.send({ id: 0 });
    }
  })
})

//return the user info by email
router.route("/lookup/:email").post((request, response) => {
  dboperations.getUserByEmail(request.params.email).then(result => {
    if (result.length > 0) {
      response.send({ id: result[0].id });
    } else {
      response.send({ id: 0 });
    }

  })
})

//Add as new user
router.route("/users").post((request, response) => {
  let user = { ...request.body }
  dboperations.addUser(user).then(result => {
    console.log("result of add user: " + result);
    response.status(201).json(result);
  })
})

//COURSE ROUTES
//get a specified user by id
router.route("/courses/:userId").get((request, response) => {
  dboperations.getCourses(request.params.userId).then(result => {
    response.json(result[0]);
  })
})


//log in route
router.route("/login").get((request, response) => {
  const { Email, Password } = request.body;

  dboperations.getUserByEmail(Email)
    .then(result => {

      if (result.length > 0) {
        const email = result[0].Email;
        const returnedPassword = result[0].Password;
        const userId = result[0].id;

        bcrypt.compare(Password, returnedPassword, (error, verdict) => {
          if (verdict) {

            //generate a JasonWebToken
            const JWTKey = process.env._JWT_SECRET_KEY;

            const token = jwt.sign({ userID: userId }, JWTKey, {
              expiresIn: '10h'
            });

            response.json({ auth: true, token: token, result: result })
          } else {
            response.send({ message: "Wrong username/password combination" });
          }
        })
      } else {
        response.send({ message: "User does not exist" });
      }

    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});