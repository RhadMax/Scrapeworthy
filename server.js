var express = require("express");
const exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeworthy";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

module.exports = app;