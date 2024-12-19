var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/* GET users listing. */
router.get("/", function (req, res, next) {});

// Route pour inscription

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["email", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ username: req.body.username }).then((data) => {
    if (data) {
      res.json({ result: false, error: "Username already used" });
      return;
    } else {
      User.findOne({ email: req.body.email }).then((data) => {
        if (data) {
          res.json({ result: false, error: "Email already used" });
          return;
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10);
          const newUser = new User({
            token: uid2(32),
            email: req.body.email,
            username: req.body.username,
            password: hash,
          });
          newUser.save().then((data) => {
            res.json({
              result: true,
              userInfos: {
                token: data.token,
                email: data.email,
                username: data.username,
                sound: data.sound,
                weight: data.weight,
                target: data.target,
              },
            });
          });
        }
      });
    }
  });
});

// Route pour connexion
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
        userInfos: {
          token: data.token,
          email: data.email,
          username: data.username,
          sound: data.sound,
          weight: data.weight,
          target: data.target,
        },
      });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

// Route pour change le son
router.put("/changeSound", (req, res) => {
  if (!checkBody(req.body, ["token", "newSound"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ token: req.body.token }).then((user) => {
    if (!user) {
      res.json({ result: false, error: "User not found" });
      return;
    } else {
      user.sound = req.body.newSound;
      user.save().then((userUpdated) => {
        if (userUpdated) {
          res.json({ result: true, soundUpdated: userUpdated.sound });
          return;
        } else {
          res.json({
            result: false,
            error: "Une erreur s'est produite lors de la modification du son",
          });
        }
      });
    }
  });
});

// Route pour changer adresse email
router.put("/changeEmail", async (req, res) => {
  const { email, password, token } = req.body;
  if (!email || !password || !token) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const user = await User.findOne({ token });
  if (!user) {
    res.json({ result: false, error: "User not found" });
    return;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.json({ result: false, error: "Password invalid" });
    return;
  }
  user.email = email;
  user.save().then((data) => res.json({ result: true, newEmail: data.email }));
});

// Pour changer de password
router.put("/changePassword", async (req, res) => {
  const { email, password, token, newPassword } = req.body;
  if (!email || !password || !token || !newPassword) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const user = await User.findOne({ token });
  if (!user) {
    res.json({ result: false, error: "User not found" });
    return;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.json({ result: false, error: "Password invalid" });
    return;
  }
  if (bcrypt.compareSync(newPassword, user.password)) {
    res.json({ result: false, error: "Password has not changed" });
    return;
  }
  user.password = bcrypt.hashSync(newPassword, 10);
  user.save().then(() => res.json({ result: true, error: user }));
});

// Pour changer le username
router.post("/changeUsername", async (req, res) => {
  const { email, password, token, username } = req.body;
  if (!email || !password || !token || !username) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const user = await User.findOne({ token });
  if (!user) {
    res.json({ result: false, error: "User not found" });
    return;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.json({ result: false, error: "Password invalid" });
    return;
  }
  if (username === user.username) {
    res.json({ result: false, error: "Username has not changed" });
    return;
  }
  const usernameList = await User.findOne({ username });
  if (usernameList) {
    res.json({ result: false, error: "Username already used" });
    return;
  }
  user.username = username;
  user
    .save()
    .then((data) => res.json({ result: true, newUsername: data.username }));
});

//Pour ajouter un poids
router.post("/addWeight", async (req, res) => {
  const { weight, token } = req.body;
  if (!weight || !token) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const user = await User.findOne({ token });

  if (!user) {
    res.json({ result: false, error: "User not founds" });
    return;
  }
  const newWeight = {
    weight,
    date: new Date(),
  };
  user.weight.push(newWeight);
  user.save().then(() => {
    res.json({ result: true, newWeight });
  });
});

// Route pour ajouter un objectif de poids

router.post("/weightTarget", async (req, res) => {
  const { token, weight, date, objectif, initialWeight } = req.body;
  if (!token || !weight || !date || !objectif) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const user = await User.findOne({ token });

  if (!user) {
    res.json({ result: false, error: "User not found" });
    return;
  }

  const weightTarget = {
    weight: weight,
    date: date,
    objectif: objectif,
    initialWeight,
  };
  user.target = weightTarget;
  user.save().then(() => {
    res.json({ result: true, weightTarget });
  });
});

// Route pour demander un changement de mot de passe et envoyer un mail avec un token
router.post("/forgotPassword", (req, res) => {
  const { email } = req.body;
  User.find({ email: email }).then((user) => {
    if (user.length === 0) {
      res.json({ result: false, error: "User not found with this email" });
    } else {
      const token = crypto.randomBytes(2).toString("hex");
      const hash = bcrypt.hashSync(token, 10);
      user[0].resetToken = hash;
      user[0].save().then((updatedUser) => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_MAIL,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        const mailOptions = {
          from: "progress.pulse.app@gmail.com",
          to: "thomas.lebel38@gmail.com",
          subject: "Reinitialisation du mot de passe",
          text: `Votre code pour réinitialiser le mot de passe : ${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).send("Error sending email");
          } else {
            console.log(`Email sent: ${info.response}`);
            res
              .status(200)
              .send(
                "Check your email for instructions on resetting your password"
              );
          }
        });
      });
    }
  });
});

// Route pour vérifier le token de l'utilisateur
router.get("/verifyResetToken", (req, res) => {
  const { email, token } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.json({ result: false, error: "User not found" });
    } else {
      if (bcrypt.compareSync(token, user.resetToken)) {
        res.json({ result: true, data: "Le token est ok" });
      } else {
        res.json({ result: false, data: "Le token est pas ok" });
      }
    }
  });
});

// Route pour vérifier le token de l'utilisateur et changer le mot de passe
router.post("/changeForgottenPassword", (req, res) => {
  const { email, token, newPassword } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.json({ result: false, error: "User not found" });
    } else {
      if (bcrypt.compareSync(token, user.resetToken)) {
        user.password = bcrypt.hashSync(newPassword, 10);
        user.resetToken = "";
        user
          .save()
          .then(() =>
            res.json({ result: true, message: "Mot de passe modifié" })
          );
      } else {
        res.json({ result: false, data: "Le token est pas ok" });
      }
    }
  });
});

module.exports = router;
