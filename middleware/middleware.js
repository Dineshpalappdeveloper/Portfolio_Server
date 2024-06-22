const ObjectId = require("mongoose").Types.ObjectId;

const validateDbId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id) == false) {
    // checking given id is valid acc to mongodb or not
    res.status(400).send({ error: `given id ${req.params.id} is not valid` });
  } else {
    next();
  }
};

module.exports = { validateDbId };
