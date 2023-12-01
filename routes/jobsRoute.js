import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController,deleteJobController,getJobController, jobStatController, updateJobController } from '../controllers/jobsController.js';
const router = express.Router();

router.post('/create-job',userAuth,createJobController)

//GET JOBS
router.get('/get-job',userAuth,getJobController)

//Update Job || Put || Patch wrt dynamic id
router.patch('/update-job/:id',userAuth,updateJobController)

//Delete JOBS
router.delete('/delete-job/:id',userAuth,deleteJobController)

//JOB STAT FILTER || GET
router.get('/job-stat',userAuth,jobStatController)

export default router