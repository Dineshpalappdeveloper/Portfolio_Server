const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ConnectDb = require("./db/connection");
require("dotenv").config();
const GlobalRoutes = require("./routes/GlobalRoutes");
const responseModel = require("./models/responseModel");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const CreateResponse = async (req, res) => {
  try {
    const data = await responseModel.create(req.body);
    res.status(201).send({ message: "Response Saved", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllResponse = async (req, res) => {
  try {
    const data = await responseModel.find();
    res.status(200).send({ message: "Data Fetched", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

app.get("/", getAllResponse);
app.post("/", CreateResponse);
// app.use("/", GlobalRoutes);

const startConnection = async () => {
  try {
    await ConnectDb(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Connection error:", error);
  }
};

startConnection();
