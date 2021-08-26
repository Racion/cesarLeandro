const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false })); // para que el servidor entienda que se trata con datos simples
app.use(express.json());
app.use(require("./routes/index"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3500, () => {
  console.log("Server on port 3500");
});
