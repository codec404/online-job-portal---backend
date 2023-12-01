import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";
import moment from "moment/moment.js";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("All fields are not filled");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);

  res.status(201).json({
    job,
  });
};

export const getJobController = async (req, res, next) => {
  // const job  = await jobModel.find({createdBy: req.user.userId})

  // Search Filters and Sort Filters
  // Query String www.api/v1/login?key=value

  const { status, workType, search, sort } = req.query;
  //Conditions for searching
  const queryObj = {
    createdBy: req.user.userId,
  };

  //Logic for filters
  if (status && status !== "all") {
    // all for frontend there is no all field in the enum status of backend
    queryObj.status = status;
  }
  if (workType && workType !== "all") {
    queryObj.workType = workType;
  }

  //position searching filter --> we will allow mistake in search string as well
  if (search) {
    queryObj.position = { $regex: search, $options: "i" }; // case Insensitive ... similar type of search query
  }

  let queryRes = jobModel.find(queryObj);

  if (sort === `latest`) {
    queryRes = queryRes.sort("-createdAt");
  }

  if (sort === `oldest`) {
    queryRes = queryRes.sort("createdAt");
  }

  if (sort === `a-z`) {
    queryRes = queryRes.sort("position");
  }

  if (sort === `z-a`) {
    queryRes = queryRes.sort("-position");
  }

  //<======Pagination=====>

  const page = Number(req.query.page) || 1;
  //per page document show
  const limit = Number(req.query.limit) || 10;
  //skip
  const skip = (page - 1) * limit;

  queryRes = queryRes.skip(skip).limit(limit);
  const totalJobs = await jobModel.countDocuments(queryRes); //Count total jobs
  const numOfPage = Math.ceil(totalJobs / limit);

  const job = await queryRes;

  res.status(200).json({
    totalJobs,
    job,
    numOfPage,
  });
};

export const updateJobController = async (req, res, next) => {
  // Destructure id from params
  const { id } = req.params;

  const { company, position } = req.body;
  // Validation
  if (!company || !position) {
    next("All fields are not filled");
  }
  //find Jobs
  const job = await jobModel.findOne({ _id: id });
  if (!job) {
    next("Wrong Job ID");
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }
  const upDateJob = await jobModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    upDateJob,
  });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobModel.findOne({ _id: id });
  if (!job) {
    next("Wrong job id");
  }
  await job.deleteOne();
  res.status(200).send({
    message: "Successfully Deleted the job",
  });
};

// ======== JOB STAT & FILTERS ============

export const jobStatController = async (req, res) => {
  const stat = await jobModel.aggregate([
    //search by user job
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }, // Giving the stats like the count of candidates in interview,rejected,accepted
      },
    },
  ]);

  // const defaultStats = {
  //     pending: stat.pending || 0,
  //     reject: stat.reject || 0,
  //     interview: stat.interview || 0
  // }

  //Monthly,Yearly stats
  let monthlyApplications = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: `$createdAt` },
          month: { $month: `$createdAt` },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(200).json({
    total_count: stat.length,
    stat, //default stats has some problem always giving the field as 0
    monthlyApplications,
  });
};
