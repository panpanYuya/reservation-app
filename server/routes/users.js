const express = require('express');
const { findOne } = require('../model/user');
const router = express.Router();
const User = require('../model/user');
const config = require('../config');
const jwt = require('jsonwebtoken');

router.post('/login', function(req, res){
  // Product.find({}, function(err, foundProduct){
  //   res.json(foundProduct)
  // })
  const {email, password} = req.body

  if(!email){
    //Invalid Error
    return res.status(422).send({errors: [{title: 'User error',detail: 'Please fill email!'}]})
  }
  if(!password){
    //Invalid Error
    return res.status(422).send({errors: [{title: 'User error',detail: 'User not password!'}]})
  }

  User.findOne({email}, function(err, foundUser){
    if(err) {
      //Error message
      return res.status(422).send({errors: [{title: 'User error',detail: 'Something went wrong!'}]})
    }
    if(!foundUser){
      //Invalid Error
      return res.status(422).send({errors: [{title: 'User error',detail: 'User not Found!'}]})
    }
    if(!foundUser.hasSamePassword(password)){
      return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    },  config.SECRET , { expiresIn: '1h' });

    return res.json(token);
  })
})

router.post('/register', function(req, res) {


  const {username, email,password, confirmPassword } = req.body

  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;

  if(!username){
    return res.status(422).send({errors: [{title: 'User error',detail: 'Please fill username!'}]})
  }
  if(!email){
    //Invalid Error
    return res.status(422).send({errors: [{title: 'User error',detail: 'Please fill email!'}]})
  }
  if(!password){
    //Invalid Error
    return res.status(422).send({errors: [{title: 'User error',detail: 'User not password!'}]})
  }
  if(password !== confirmPassword){
    //Invalid Error
    return res.status(422).send({errors: [{title: 'User error',detail: 'Please check passwords!'}]})
  }

  User.findOne({email}, function(err, foundUser){
    if(err) {
      //Error message
      return res.status(422).send({errors: [{title: 'User error',detail: 'Something went wrong!'}]})
    }
    if(foundUser){
      //Invalid Error
      return res.status(422).send({errors: [{title: 'User error',detail: 'User already exist!'}]})
    }
    const user = new User({username, email, password})

    user.save(function(err) {
      if(err) {
        //Error message
        return res.status(422).send({errors: [{title: 'User error',detail: 'Something went wrong!'}]})
      }
      return res.json({"registerd": true})
    })

  })
})

module.exports = router
