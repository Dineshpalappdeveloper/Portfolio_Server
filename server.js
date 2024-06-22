const express = require("express");
const cors = require("cors");
const PORT = 4000;
const bodyParser = require("body-parser");
const ConnectDb = require("./db/connection");
require("dotenv").config();
const GlobalRoutes = require("./routes/GlobalRoutes");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("welcome Back");
});
app.use("/", GlobalRoutes);
const startConnection = async () => {
  try {
    // console.log(process.env.MONGO_URL);
    await ConnectDb(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is runing on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startConnection();
