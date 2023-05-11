const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const morgan = require("morgan");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://amazin-api.herokuapp.com"],
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Sample GET route
app.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!",
  })
);

const departments = require("./routes/departments");
const categories = require("./routes/categories");
const products = require("./routes/products");
const orders = require("./routes/orders");
const reviews = require("./routes/reviews");
const users = require("./routes/users");

app.use("/api", departments);
app.use("/api", categories);
app.use("/api", products);
app.use("/api", orders);
app.use("/api", reviews);
app.use("/api", users);

app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
