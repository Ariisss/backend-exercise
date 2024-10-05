const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// registering a user with input validation (joi) and checking if the user already exists
const registerUser = (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password, email } = req.body;
  const existingUser = userModel.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  userModel.addUser({ username, password, email });
  res.status(201).json({ message: 'User registered successfully' });
};

// user authentication and jwt token generation upon successful login
const loginUser = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const user = userModel.findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
  res.json({ token });
};

// displays user profile information (only if the user is authenticated)
const getUserProfile = (req, res) => {
  const user = userModel.findUserById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ username: user.username, email: user.email });
};

module.exports = { registerUser, loginUser, getUserProfile };