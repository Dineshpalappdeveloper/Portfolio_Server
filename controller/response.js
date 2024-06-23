const responseModel = require("../models/responseModel");
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
module.exports = { CreateResponse, getAllResponse };
