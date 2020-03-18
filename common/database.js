const mongoose = require("mongoose");
module.exports = () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://localhost:27017/Cms_database", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return mongoose;
};
