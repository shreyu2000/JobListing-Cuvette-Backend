const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    jobPosition: {
        type: String,
        required: true,
    },
    monthlySalary: {
        type: String,
        required: true,
    },
    jobType: {
        type: Array,
    },
    remoteOffice: {
        type: Array,
    },
    location: {
        type: String,
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
        type: String
    }

});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
