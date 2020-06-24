const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });
require("./models/User");
require("./services/passport");

const app = express();
app.use(
  cookieSession({
    keys: [keys.cookieKey],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
//Client Id
//Client secret

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
