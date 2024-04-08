const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const sampleResult = {
  token: 'abcdefg',
  user: {
    firstname: 'Brian',
    lastname: 'Stafford',
    email: "brian.stafford@yahoo.com",
    isAdmin: true
  }
}

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/test", (req,res) => {
  res.json(sampleResult);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});