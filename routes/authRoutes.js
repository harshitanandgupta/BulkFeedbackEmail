const passport = require("passport");
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"));
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  app.get("/auth/google/logout", (req, res) => {
    req.logout();
    res.send("User logged Out!!!");
  });
  app.get("/", (req, res) => {
    res.send(req.user);
  });
};
