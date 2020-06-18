const mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://Hero:hero@mongo@reactecommerce-ytd7c.mongodb.net/graphql?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.set("useCreateIndex", true);

mongoose.connect(
  mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log("MongoDB connected");
    } else {
      console.log("Error: " + err);
    }
  }
);