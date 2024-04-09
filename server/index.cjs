const express = require("express");
const cors = require('cors');
const Db = require('./dboperations.cjs');
const User = require('./user.cjs');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const dboperations = require('./dboperations.cjs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


//middleware here
router.use((request,response,next) => {
  console.log("middleware");
  next();
})

//get all users
router.route("/users").get((request,response) => {
  dboperations.getAllUsers().then(result => {
    response.json(result[0]);
  })
})

//get a specified user by id
router.route("/users/:id").get((request,response) => {
  dboperations.getUser(request.params.id).then(result => {
    response.json(result[0]);
  })
})

//get all users
router.route("/users").post((request,response) => {

  let user = {...request.body}

  dboperations.addUser(user).then(result => {
    response.status(201).json(result);
  })
})

//test using the hard coded test data
const sampleResult = {
  token: 'abcdefg',
  user: {
    firstname: 'Brian',
    lastname: 'Stafford',
    email: "brian.stafford@yahoo.com",
    isAdmin: true
  }
}

router.route("/test").get((request,response) => {
  response.json(sampleResult);
})




// app.post("/test", (req,res) => {
//   res.json(sampleResult);
// })

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});