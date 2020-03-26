const mongoose = require("mongoose");
module.exports = () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://localhost:27017/Cms_database" || process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return mongoose;
};
