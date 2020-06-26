const keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
const reqLogin = require("../middlewares/reqLogin");
module.exports = (app) => {
  app.post("/api/stripe", reqLogin, async (req, res) => {
    // console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "Adding Credits",
    });
    if (charge.status === "succeeded") {
      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } else res.status(500).send(user);
  });
};
