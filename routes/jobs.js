const express = require("express");
const router = express.Router();
const Job = require("../models/job.model.js");
const jwtVerify = require('../middlewares/authMiddleware.js');


//create job working
router.post("/createJob", jwtVerify, async (req, res) => {
  try {
    const newJob = {...req.body , skillsRequired :req.body.skillsRequired.split(",")}
    //joi
    const createdJob = await Job.create({
      ...newJob,
      refUserId: req.body.userId,
    });

    res.json({ message: "New Job Created Successfully" , createdJob});
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit job  jobid dynamic working
router.put("/edit/:jobId", jwtVerify, async (req, res) => {
  try {
   
    const jobId = req.params.jobId;
    const newJobObj =  {...req.body , skillsRequired :req.body.skillsRequired.split(",")}

   const updatedJob= await Job.findByIdAndUpdate(jobId,newJobObj ,{new:true})

    res.json({ message: "Job Details Updated Successfully"  , updatedJob});
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/job-description/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;

    //joi
    if (!jobId) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const jobDetails = await Job.findById({ _id: jobId});

    res.json({ data: jobDetails });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    // const title = req.query.title || " ";
    // const skills = req.query.skillsRe

    const {skills , position } =req.query;
    const filterSkills = skills?.split(",") || [];

    let filter= {};

    if (filterSkills.length !== 0) {
      filter.skillsRequired = {
        $in: filterSkills.map((skill) => new RegExp(`^${skill}$`, "i")),
      };
    }
    if (position) {
      filter.$or = [{ jobPosition: { $regex: position, $options: "i" } }];
    }

    console.log("Filter:", filter);

    const jobList = await Job.find(
      filter,
      {
        information: 0,
        aboutCompany: 0,
        jobDescription: 0,
      }
    );
    console.log("Job List:", jobList);

    res.json({jobList });//to be  visited again

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//delete job


module.exports = router;
