const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const User = require('./models/User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

passport.use(new LocalStrategy({ usernameField: 'userName', passwordField:'password' }, (username, password, done) => {
  var criteria = {userName: userName};
  User.findOne(criteria, (err, user) => {
      console.log("errhahah")
      console.log(err)
      console.log("errhahah")
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

exports.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated() && req.user.status == 1){
    return next();
  }
  return res.redirect('/');
}

exports.isAuthAdmin = (req, res, next) => {
  if(req.user.permission == 1){
    return next();
  }
  return res.redirect('/');
}
