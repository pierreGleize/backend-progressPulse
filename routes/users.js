var express = require('express');
var router = express.Router();
const {checkBody} = require('../modules/checkBody')
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("dans la route")
});

// Route pour inscription

router.post('/signup', (req,res) => {
  if(!checkBody(req.body, ['email', 'username', 'password'])){
    res.json({result: false, error: 'Missing or empty fields'})
    return
  }
  User.findOne({username : req.body.username})
  .then(data => {
    if (data){
      res.json({result:false, error: 'Username already used'})
      return
    } else {
      User.findOne({email: req.body.email})
      .then(data => {
        if (data){
          res.json({result:false, error: 'Email already used'})
          return
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10)
          const newUser = new User({
            token : uid2(32),
            email : req.body.email,
            username : req.body.username,
            password : hash,
          })
          newUser.save()
          .then(data => {
            res.json({result: true, userInfos : {token : data.token, email: data.email, username: data.username, sound: data.sound, weight: data.weight}})
          })
        }
      })
    }
  })
})

// Route pour connexion
router.post('/signin', (req, res) => {
  if(!checkBody(req.body, ['email', 'password'])){
    res.json({result: false, error: 'Missing or empty fields'})
    return
  }
  User.findOne({email : req.body.email})
  .then(data => {
    if(data && bcrypt.compareSync(req.body.password, data.password)){
      res.json({result:true, userInfos: {token : data.token, email: data.email, username: data.username, sound: data.sound, weight: data.weight}})
    } else {
      res.json({result: false, error: 'User not found or wrong password'})
    }
  })
})

// Route pour change le son
router.put('/changeSound', (req, res) => {
  if(!checkBody(req.body, ["token", "newSound"])){
    res.json({result: false, error: 'Missing or empty fields'})
    return
  }
  User.findOne({token : req.body.token})
  .then(user => {
    if(!user){
      res.json({result: false, error:'User not found'})
      return
    } else {
      user.sound = req.body.newSound
      user.save()
      .then(userUpdated => {
        if (userUpdated){
          res.json({result: true, soundUpdated: userUpdated.sound})
          return
        } else {
          res.json({result: false, error: "Une erreur s'est produite lors de la modification du son"})
        }
      })
    }
  })
})

module.exports = router;
