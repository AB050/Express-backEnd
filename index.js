const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect(
  "mongodb+srv://abhinayaman94:Figm6QLs3hlarryg@cluster0.pyiyahu.mongodb.net/user_app"
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const userName = req.body.userName; // Should be req.body.email
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({ email: userName }); // Should use email field
  // CRUD => Create, Read,Update,Delete
  if (existingUser) {
    return res.status(400).send("User Already Exists");
  }

  const user = new User({ name, email: userName, password }); // Use consistent variable names
  await user.save(); // Save the user instance, not the User model

  res.json({
    msg: "User Created Successfully",
  });
});

app.listen(3000);
