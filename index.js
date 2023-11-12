require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const ejs = require("ejs");

const connectDB = require("./db/dbConnect");
const routes = require("./routes/index");

const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");

const { configurePassport } = require("./config/passport");
configurePassport(app);

app.use(morgan("dev")); //use morgan to log requests to the console
app.use(compression()); //use compression
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/", routes);
// start server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI).then(() =>
      console.log("Connected to MongoDB...")
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
