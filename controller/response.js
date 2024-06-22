const responseModel = require("../models/responseModel");
const ObjectId = require("mongoose").Types.ObjectId;
const CreateResponse = async (req, res) => {
  try {
    const data = await responseModel.create(req.body);
    res.status(201).send({ message: "Response Saved ", data: data });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
module.exports = { CreateResponse };
