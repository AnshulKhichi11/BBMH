const express = require("express");
const router = express.Router();

router.get("/doctorinfoAL", (req, res) => {
    res.render("doctorinfoAl.ejs");
});

router.get("/doctorinfoNer", (req, res) => {
    res.render("doctorinfoNer.ejs");
});

router.get("/doctorinfoPar", (req, res) => {
    res.render("doctorinfoPar.ejs");
});

router.get("/doctorinfoUt", (req, res) => {
    res.render("doctorinfoUt.ejs");
});

router.get("/doctorinfoSid", (req, res) => {
    res.render("doctorinfoSid.ejs");
});

router.get("/doctorinfoAn", (req, res) => {
    res.render("doctorinfoAn.ejs");
});

router.get("/doctorinfoKD", (req, res) => {
    res.render("doctorinfoKD.ejs");
});

router.get("/doctorinfoSac", (req, res) => {
    res.render("doctorinfoSac.ejs");
});

router.get("/doctorinfoDe", (req, res) => {
    res.render("doctorinfoDe.ejs");
});

router.get("/doctorinfoSu", (req, res) => {
    res.render("doctorinfoSu.ejs");
});

router.get("/doctorinfoAk", (req, res) => {
    res.render("doctorinfoAk.ejs");
});

router.get("/doctorinfoVi", (req, res) => {
    res.render("doctorinfoVi.ejs");
});

router.get("/doctorinfoMa", (req, res) => {
    res.render("doctorinfoMa.ejs");
});

router.get("/doctorinfoVij", (req, res) => {
    res.render("doctorinfoVij.ejs");
});

router.get("/doctorinfoNi", (req, res) => {
    res.render("doctorinfoNi.ejs");
});

router.get("/doctorinfoTa", (req, res) => {
    res.render("doctorinfoTa.ejs");
});

router.get("/doctorinfoRo", (req, res) => {
    res.render("doctorinfoRo.ejs");
});

module.exports = router;