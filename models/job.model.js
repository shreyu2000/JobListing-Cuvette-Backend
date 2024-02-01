const mongoose = require('mongoose');
//job details schema
const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    monthlySalary: {
        type: String,
        required: true,
    },
    jobType: {
        type: Array,
        default:[],
    },
    remoteOffice: {
        type: Array,
        default:[],
    },
    location: {
        type: String,
        default:"Unknown"
    },
    jobDescription: {
        type: String,
    },
    aboutComp: {
        type: String,
    },
    skills: {
        type: Array,
    },
    addInfo: {
        type: String,
    },
    refUserId:{
        type:mongoose.Types.ObjectId,
        required:true,
    }

});



const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

// companyName,
// logoUrl,
// jobTitle,
// monthlySalary,
// jobType,
// remoteOffice,
// location,
// jobDescription,
// aboutComp,
// skills,
// addInfo
