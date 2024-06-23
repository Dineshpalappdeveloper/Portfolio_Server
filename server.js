const express = require("express");
const cors = require("cors");
const PORT = 4000;
const bodyParser = require("body-parser");
const ConnectDb = require("./db/connection");
require("dotenv").config();
const GlobalRoutes = require("./routes/GlobalRoutes");
const responseModel = require("./models/responseModel");

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
const CreateResponse = async (req, res) => {
  try {
    const data = await responseModel.create(req.body);
    res.status(201).send({ message: "Response Saved ", data: data });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const getAllResponse = async (req, res) => {
  try {
    await responseModel
      .find()
      .then((data) => {
        res.status(200).send({ message: "data Fetched", data: data });
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
app.get("/hr", getAllResponse);
app.post("/hr", CreateResponse);
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
