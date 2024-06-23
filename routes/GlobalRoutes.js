const express = require("express");
// const {
//   createStaff,
//   getAllStaff,
//   updateStaffById,
//   deleteStaffById,
// } = require("../controller/staff");
// const { validateDbId } = require("../middleware/middleware");
// const {
//   userRegisterValidation,
//   userLoginValidator,
// } = require("../utils/uservalidation");
// const { isAuthenticated } = require("../utils/auth");
// const {
//   registerUser,
//   loginUser,
//   getAllusers,
//   createorder,
//   getAllorder,
// } = require("../controller/user");
const { CreateResponse, getAllResponse } = require("../controller/response");
const router = express.Router();

// router.post("/api/staff", createStaff);
// router.get("/api/staff", getAllStaff);
// router.put("/api/staff/:id", validateDbId, updateStaffById);
// router.delete("/api/staff/:id", validateDbId, deleteStaffById);
// // Users Routes
// router.post("/api/register", userRegisterValidation, registerUser);
// router.post("/api/login", userLoginValidator, loginUser);
// router.post("/api/order", createorder);
// router.get("/api/order", getAllorder);
// router.post("/hr/response", CreateResponse);
// router.get("/hr/response", getAllResponse);

// router.post("/api/user", isAuthenticated, getAllusers);
module.exports = router;
