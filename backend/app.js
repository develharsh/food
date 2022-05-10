const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/config", ".env") });
const route = require("./routes");
const app = express();

const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const logger = require("morgan");

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(logger("dev"));

app.use(cookieParser());
app.use(cors());

app.use(expressSanitizer());
require("./config/DBConnect");

app.use("/api/v1", route);
app.use("/test", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Backend is good working fine." });
});

// /*Frontend hai
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 4001;
app.listen(port, function () {
  console.log("Express app running sdfsdfn port " + port);
});
