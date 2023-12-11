import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUserDataController, userUpdateController } from "../controllers/userUpdateController.js";
import { getUserController } from "../controllers/getUserController.js";

//router object

const router = express.Router();
//GET USER DATA
router.get("/get-user", userAuth,getUserController);

//GET USER DATA FOR FRONTEND
router.post("/get-user-data",userAuth,getUserDataController)

// UPDATE USER --> PUT
router.put("/update-user", userAuth, userUpdateController);

export default router;
