const studentInfo = require("../models/student_info");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const getAdmitCard = async (req, res) => {
  try {
    const data = await studentInfo.findOne({
      rollNo: Number(req.params.roll_no),
    });

    if (!data) {
      return res.status(400).send({ error: "student not found" });
    }

    res.render("admitCardTemplate", {
      studentData: data,
    });
  } catch (err) {
    res.send(err);
  }
};

const generetePDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new", pipe: true });
    const newPage = await browser.newPage();
    const roll_no = req.params.roll_no;

    const data = await studentInfo.findOne({
      rollNo: roll_no,
    });

    if (!data) {
      return res.status(400).send({ error: "student not found" });
    }

    const url = `http://localhost:5000/data/${roll_no}`;
    await newPage.goto(url, { waitUntil: "networkidle2" });
    const uniqueName = `Admit card - ${roll_no}`;
    const pdf = await newPage.pdf({
      format: "A4",
      printBackround: true,
    });
    await browser.close();
    fs.writeFileSync(
      `${path.join(__dirname, "../public/pdf")}/${uniqueName}.pdf`,
      pdf
    );
    return res
      .status(200)
      .json({ pdfUrl: `http://localhost:5000/downloadPDF/${roll_no}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const downloadPdf = async (req, res) => {
  try {
    const roll_no = req.params.roll_no;
    const data = await studentInfo.findOne({
      rollNo: roll_no,
    });
    const uniqueName = `Admit card - ${roll_no}`;
    const pdfPath = `${path.join(
      __dirname,
      "../public/pdf"
    )}/${uniqueName}.pdf`;

    if (!data || !fs.existsSync(pdfPath)) {
      return res.status(400).send({ error: "student not found" });
    }

    res.download(pdfPath);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAdmitCard,
  generetePDF,
  downloadPdf,
};
