const faker = require("faker");
const mongoose = require("mongoose");
const User = require("./schemas/user");

require("dotenv").config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

const makeUser = async () => {
  console.log("here");
  try {
    const user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      type: faker.name.jobType()
    });
    await user.save();
    console.log("okay");
  } catch (err) {
    console.log(err.message);
  }
};

makeUser();
