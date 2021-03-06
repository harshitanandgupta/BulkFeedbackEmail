const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accesstoken, refreshtoken, profile, done) => {
      // console.log(accesstoken);
      // console.log(refreshtoken);
      // console.log(profile);
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        console.log("Welcome Old");
        return done(null, existingUser);
      }
      const user = await new User({ googleID: profile.id }).save();
      console.log("Welcome New");
      done(null, user);
    }
  )
);
