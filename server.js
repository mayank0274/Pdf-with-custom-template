const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT | 5000;
const dbConnection = require("./db/conn");
const routes = require("./routes/api");
dbConnection();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views/"));
app.use(express.static("public"));

routes(app);

app.listen(PORT, () => {
  console.log("connected to server");
});
