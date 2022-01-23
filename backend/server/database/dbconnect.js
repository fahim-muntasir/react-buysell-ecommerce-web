const mongoose = require("mongoose");

const dbConnect = () => {
  const dbConnection = mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    .then(() => console.log("database connection successfull!"))
    .catch((err) => console.log(err));
  return dbConnection;
};

module.exports = dbConnect;
