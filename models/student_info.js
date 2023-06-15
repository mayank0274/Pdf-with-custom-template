const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  fatherName: {
    type: String,
    require: true,
  },
  motherName: {
    type: String,
    require: true,
  },
  examinationCenter: {
    type: String,
    require: true,
  },
  examinationType: {
    type: String,
    require: true,
  },
  rollNo: {
    type: Number,
    require: true,
  },
  std_class: {
    type: String,
    require: true,
  },
  college: {
    type: String,
    require: true,
  },
  subjects: [
    {
      code: String,
      subject_name: String,
    },
  ],
  image: {
    type: String,
  },
});

const studentInfo = mongoose.model("SudentInfo", infoSchema);

module.exports = studentInfo;
