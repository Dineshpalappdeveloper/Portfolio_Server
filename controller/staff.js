const staffModel = require("../models/staffModel");
const ObjectId = require("mongoose").Types.ObjectId;
const createStaff = async (req, res) => {
  try {
    const data = await staffModel.create(req.body);
    res.status(201).send({ message: "staff created", data: data });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const getAllStaff = async (req, res) => {
  try {
    await staffModel
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

const getStaffById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) == false) {
      // checking given id is valid acc to mongodb or not
      res.send({ error: "given id is not valid" });
    } else {
      let id = req.params.id;

      await staffModel
        .findById(id)
        .then((data) => {
          if (data) {
            res.status(200).send({ data: data });
          } else {
            res.status(400).send({ error: "not found" });
          }
        })
        .catch((err) => res.status(400).send({ error: "Data not found" }));
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const updateStaffById = async (req, res) => {
  try {
    let id = req.params.id;
    await staffModel.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .send({ message: "Data Updated successfully", data: req.body });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const deleteStaffById = async (req, res) => {
  try {
    let id = req.params.id;
    await staffModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Data deleted Successsfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
module.exports = { createStaff, getAllStaff, deleteStaffById, updateStaffById };
