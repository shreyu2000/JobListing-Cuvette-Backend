const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Job = require("../models/user.model");
const jwtVerify = require('../middlewares/authMiddleware.js');

//create job
router.post("/create", jwtVerify, async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      jobTitle,
      monthlySalary,
      jobType,
      remoteOffice,
      location,
      jobDescription,
      aboutComp,
      skills,
      addInfo,
    } = req.body;

    //joi
    if (
      !companyName ||
      !logoUrl ||
      !jobTitle ||
      !monthlySalary ||
      !jobType ||
      !remoteOffice ||
      !location ||
      !jobDescription ||
      !aboutComp ||
      !skills
    ) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const jobDetails = new Job({
      companyName,
      logoUrl,
      jobTitle,
      monthlySalary,
      jobType,
      remoteOffice,
      location,
      jobDescription,
      aboutComp,
      skills,
      addInfo,
      refUserId: req.body.userId,
    });

    await jobDetails.save();

    res.json({ message: "New Job Created Successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit job

router.put("/edit/:jobId", jwtVerify, async (req, res) => {
  try {
    const { companyName, title, description, logoUrl } = req.body;
    const jobId = req.params.jobId;

    //joi
    if (!companyName || !title || !logoUrl || !description || !jobId) {
      return res.status(400).json({ error: "Bad Request" });
    }

    await Job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          title,
          description,
          logoUrl,
        },
      }
    );

    res.json({ message: "Job Updated Successfully" });
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

    const jobDetails = await Job.findById(jobId, {
      companyName: 1,
      title: 1,
    });

    res.json({ data: jobDetails });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const title = req.query.title || " ";
    const skills = req.query.skills;
    const filterSkills = skills?.split(",");

    let filter = {};

    if (filterSkills) {
      filter = { skills: { $in: filterSkills } };
    }

    console.log("Filter:", filter);

    const jobList = await Job.find(
      {
        title: { $regex: title, $options: "i" },
        ...filter,
      },
      {
        companyName: 1,
        title: 1,
        skills: 1,
      }
    );
    console.log("Job List:", jobList);

    res.json({ data: jobList });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
