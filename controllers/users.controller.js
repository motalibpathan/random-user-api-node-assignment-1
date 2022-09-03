const readJsonFile = require("../utils/readJsonFile");
const fs = require("fs");

module.exports.getRandomUser = (req, res) => {
  const users = readJsonFile();
  const random = Math.random() * users.length;
  const randomUser = users[Math.floor(random)];
  res.send({ success: true, message: "Success", data: randomUser });
};

module.exports.getAllUsers = (req, res) => {
  const users = readJsonFile();
  if (req.query.limit) {
    const limit = +req.query.limit;
    if (limit) {
      res.send({
        success: true,
        message: "Success",
        data: users.slice(0, limit),
      });
    } else {
      res.status(400).send({ success: false, error: "Limit is not a number" });
    }
  } else {
    res.send({ success: true, message: "Success", data: users });
  }
};

module.exports.saveAUser = (req, res) => {
  let users = readJsonFile();
  const newUser = req.body;
  const fields = ["id", "gender", "name", "contact", "address", "photoUrl"];
  const missingFields = fields.filter(
    (field) => !newUser.hasOwnProperty(field)
  );
  if (missingFields.length > 0) {
    const error = `Please check Missing field${
      missingFields.length !== 1 ? "s" : ""
    } : ${missingFields.join(", ")}`;
    res.status(400).send({ success: false, error });
  } else {
    users.push(newUser);
    const newUsers = JSON.stringify(users);
    fs.writeFile("users.json", newUsers, (err) => {
      if (!err) {
        res.send({
          success: true,
          message: "User save successful",
          data: newUser,
        });
      } else {
        console.log(err);
      }
    });
  }
};

module.exports.updateUser = (req, res) => {
  const users = readJsonFile();
  const id = +req.body.id;
  if (id) {
    const user = users.find((u) => u.id == id);
    if (user) {
      const userInfo = req.body;
      let updatedUser = { ...user, ...userInfo };
      const remaining = users.filter((u) => u.id != id);
      const updatedUsers = JSON.stringify([...remaining, updatedUser]);
      fs.writeFile("users.json", updatedUsers, (err) => {
        if (!err) {
          res.send({
            success: true,
            message: "User data updated successful",
            data: updatedUser,
          });
        } else {
          console.log(err);
        }
      });
    } else {
      res
        .status(400)
        .send({ success: false, error: "User not found with this id" });
    }
  } else {
    res.status(400).send({ success: false, error: "Invalid user id!" });
  }
};

module.exports.bulkUpdate = (req, res) => {
  let users = readJsonFile();
  const data = req.body;
  if (Array.isArray(data)) {
    data.forEach((userInfo) => {
      const user = users.find((u) => u.id == userInfo.id);
      if (user) {
        let updatedUser = { ...user, ...userInfo };
        const remaining = users.filter((u) => u.id != userInfo.id);
        users = [...remaining, updatedUser];
      }
    });
    // write updated file
    const updatedUsers = JSON.stringify(users);
    fs.writeFile("users.json", updatedUsers, (err) => {
      if (!err) {
        res.send({ success: true, message: "User data updated successful" });
      } else {
        console.log(err);
      }
    });
  } else {
    res.status(400).send({ success: false, error: "Something went wrong!" });
  }
};

module.exports.deleteUser = (req, res) => {
  const id = +req.body.id;
  if (id) {
    let users = readJsonFile();
    if (users.find((u) => u.id == id)) {
      const filteredUser = users.filter((u) => u.id != id);
      const newUsers = JSON.stringify(filteredUser);
      fs.writeFile("users.json", newUsers, (err) => {
        if (!err) {
          res.send({ success: true, message: "User delete successful" });
        } else {
          console.log(err);
        }
      });
    } else {
      res
        .status(400)
        .send({ success: false, error: "Delete error! User id not found!" });
    }
  } else {
    res.status(400).send({ success: false, error: "Invalid user id" });
  }
};
