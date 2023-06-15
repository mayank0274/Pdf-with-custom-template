const getData = require("../controllers/getData");

const myRoutes = (app) => {
  app.get("/", (req, res) => {
    res.render("home");
  });

  // show admit card
  app.get("/data/:roll_no", getData.getAdmitCard);

  // generate pdf
  app.get("/generate-pdf/:roll_no", getData.generetePDF);

  //download pdf
  app.get("/downloadPDF/:roll_no", getData.downloadPdf);
};

module.exports = myRoutes;
