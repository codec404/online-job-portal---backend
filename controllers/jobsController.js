import jobModel from "../models/jobModel.js"

export const createJobController  = async (req,res,next) =>{
    const {company,position} = req.body
    if(!company || !position){
        next('All fields are not filled')
    }
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body)

    res.status(201).json({
        job
    })
}

export const getJobController = async (req,res,next) => {
    const job  = await jobModel.find({createdBy: req.user.userId})
    res.status(200).json({
        totalJobs: job.length,
        job
    })
}

export const updateJobController = async (req,res,next) => {
    // Destructure id from params
    const {id} = req.params

    const {company,position} = req.body
    // Validation
    if(!company || !position){
        next('All fields are not filled')
    }
    //find Jobs
    const job = await jobModel.findOne({_id: id})
    if(!job) {
        next('Wrong Job ID');
    }
    if(!req.user.userId === job.createdBy.toString()){
        next('You are not authorized to update this job')
        return
    }
    const upDateJob = await jobModel.findByIdAndUpdate({_id: id},req.body,{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        upDateJob
    })
};

export const deleteJobController = async (req,res,next) => {
    const {id} = req.params
    const job = await jobModel.findOne({_id: id})
    if(!job){
        next("Wrong job id")
    }
    await job.deleteOne()
    res.status(200).send({
        message: "Successfully Deleted the job"
    })
}