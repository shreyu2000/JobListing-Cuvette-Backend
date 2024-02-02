const mongoose = require('mongoose');

const JOB_TYPE = ['full-time', 'part-time','internship'];
const LOCATION_PREFERENCE = ['office', 'remote'];

const jobSchema = new mongoose.Schema({
    companyName: String,
    logoUrl: String,
    jobPosition: String,
    monthlySalary: String,
    jobType: {
        type: String,
        enum: JOB_TYPE,
        default: 'full-time',
    },
    locationPreference: {
        type: String,
        enum: LOCATION_PREFERENCE,
        default: 'office',
    },
    location: String,
    countryFlag: String,
    country: String,
    jobDescription: String,
    aboutComp: String,
    companySize: String,
    jobDuration: String,
    skillsRequired: [String],
    information: String,
    refUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;


// companyName,
// logoUrl,
// jobPosition,
// monthlySalary,
// jobType,
//  locationPreference,
// location,
// jobDescription,
//companySize
//jobDuration
// skillsRequired,
// aboutComp,
// addInfo


