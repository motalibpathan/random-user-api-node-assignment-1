const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRoutes = require("./routes/v1/users.route");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Random user Api server is running");
});

app.all("*", (req, res) => {
  res.send("No route found.");
});

app.listen(port, () => {
  console.log(`Random user Api listening on port ${port}`);
});
