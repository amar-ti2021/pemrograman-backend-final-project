const express = require("express");
const PatientController = require("../controllers/PatientController");
const Patient = require("../models/PatientModel");
const router = express.Router();

router.get("/patients", PatientController.index);

router.post("/patients", PatientController.store);

router.put("/patients/:id", PatientController.update);

router.delete("/patients/:id", PatientController.destroy);

router.get("/patients/:id", PatientController.show);

router.get("/patients/search/:name", PatientController.search);

router.get("/patients/status/positive", PatientController.positive);

router.get("/patients/status/recovered", PatientController.recovered);

router.get("/patients/status/dead", PatientController.dead);

module.exports = router;
