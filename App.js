const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const Moovies = require("./routes/Moovies");
const Users = require("./routes/Users");
const Genres = require("./routes/Genres");
const Orders = require("./routes/Orders");
const Auth = require("./routes/Auth");
const { auth } = require("./middleware/auth.js");

if (!config.get("jsonPrivatKey")) {
  console.log("jsonPrivatKey variabel have not set");
  process.exit(1);
}

mongoose
  .connect(
    config.get("Customer.dbConnection"),
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("db connected"))
  .catch(error => console.log(error.message));

mongoose.connection.once("open", () => console.log("connected to db"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(config.get("password"));
});

app.use("/moovies", Moovies);
app.use("/users", Users);
app.use("/genres", auth, Genres);
app.use("/Orders", Orders);
app.use("/auth", Auth);

app.listen(config.get("Customer.PORT"), () => {
  console.log("WORK");
});
