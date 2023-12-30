const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const send_mail = require('./send_mail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};


// Define a route for handling GET requests to /home
app.get('/home', (req, res) => {
  res.json({ message: 'Welcome to the home page!' });
});

app.post('/register', async (req, res) => {
  try {
    const {Name, loginId, password } = req.body;
    const user = await EmployeeModel.findOne({ loginId: loginId });

    if (user) {
      res.json({ error: 'User already exists!' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const employee = await EmployeeModel.create({ loginId: loginId, password: hash });
      res.json(employee);
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const user = await EmployeeModel.findOne({ loginId: loginId });

    if (user) {
      const response = await bcrypt.compare(password, user.password);

      if (response) {
        const secretKey = generateSecretKey();
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
        res.cookie('token', token);
        res.json('Success');
      } else {
        res.json('The password is incorrect');
      }
    } else {
      res.json('No record exists');
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

app.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.send({ Status: 'user does not exist' });
    }

    const userId = uuidv4();
    const secretKey = generateSecretKey();
    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '1h' });
    send_mail('mushrafahmed555@gmail.com', 'otp for forgot password', `http://localhost:5173/reset_password/${userId}/${token}`);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

app.post('/reset-password/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const secretKey = generateSecretKey();
    const decoded = jwt.verify(token, secretKey);

    if (decoded && decoded.userId === id) {
      const hash = await bcrypt.hash(password, 10);
      const updatedUser = await EmployeeModel.findByIdAndUpdate(id, { password: hash });

      if (updatedUser) {
        res.json({ Status: 'Success' });
      } else {
        res.json({ Status: 'Error updating user' });
      }
    } else {
      res.json({ Status: 'Error with token' });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ Status: 'Error', error: error.message });
  }
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
