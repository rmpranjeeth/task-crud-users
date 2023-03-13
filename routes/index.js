var express = require("express");
var router = express.Router();
var mongodb = require('mongodb');

const {validateToken} = require('../config/auth')
require("dotenv").config();


// GET all users
router.get('/users', validateToken, async (req, res) => {
  try {
    const users = await usersModel.find();
    res.send({
      statusCode: 200,
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
});

// GET user by ID
router.get('/users/:id', validateToken, async (req, res) => {
  try {
    const user = await usersModel.findById(req.params.id);
    if (user) {
      res.send({
        statusCode: 200,
        message: 'User retrieved successfully',
        user,
      });
    } else {
      res.send({
        statusCode: 404,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
});

// CREATE user
router.post('/users', validateToken, async (req, res) => {
  try {
    const existingUser = await usersModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.send({
        statusCode: 400,
        message: 'User already exists',
      });
    } else {
      const newUser = await usersModel.create(req.body);
      res.send({
        statusCode: 201,
        message: 'User created successfully',
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
});

// UPDATE user by ID
router.put('/users/:id', validateToken, async (req, res) => {
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.send({
        statusCode: 200,
        message: 'User updated successfully',
        user: updatedUser,
      });
    } else {
      res.send({
        statusCode: 404,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
});

// DELETE user by ID
router.delete('/users/:id', validateToken, async (req, res) => {
  try {
    const deletedUser = await usersModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.send({
        statusCode: 200,
        message: 'User deleted successfully',
        user: deletedUser,
      });
    } else {
      res.send({
        statusCode: 404,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
});



module.exports = router;