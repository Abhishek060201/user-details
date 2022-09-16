const cityUrlMap = require('./cityUrlMap');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const MONGODB_URL = 'mongodb://localhost:27017/fitbots';
const PORT = 8000;
const app = express();

app.use(bodyParser.urlencoded({
  extends: true
}));
app.use(express.json());
app.use(cors()); 

mongoose.connect(MONGODB_URL, (err) => {
  if(err) return console.log('err');
  console.log('Connected to DB');
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: String,
  cityImageURL: String
})

const User = mongoose.model("User", UserSchema);

app.post('/user', async (req, res) => {
  let userDetail = JSON.parse(Object.keys(req.body)[0]);
  console.log(userDetail)
  const user = new User({ 
    ...userDetail, 
    cityImageURL: cityUrlMap.cities[(userDetail.city.toLowerCase())] 
    ? cityUrlMap.cities[userDetail.city.toLowerCase()]
    : ""
  });

  try {
    await user.save();
    return res.status(200).json({
      message: 'User Added'
    });
  }
  catch(err) {
    console.log(err);
    res.status(400);
  } 
});

app.get('/users', async (req, res) => {
  let users = await User.find();

  console.log(users)

  try {
    res.send(users);
  } catch(err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log('listening on', PORT);
});