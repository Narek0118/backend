require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("uploads"));
app.use("/uploads", express.static("controllers/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api", router);
// app.use(errorHandler);
app.get("/", (_, res) => {
 return res.send("Hello World!");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
