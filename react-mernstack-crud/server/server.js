const express = require("express");
const morgan = require("morgan");

const app = express();

//middlewares

app.use(express.json());
app.use(morgan("dev"));

//route

app.get("/", (req, res) => {
  res.send("<h1> Hello from Node Server</h1>");
});

app.listen(27017, () => {
  console.log("serveur démarré sur port 27017");
});
