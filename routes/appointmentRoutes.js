const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Appointment form route
router.get("/appointment", (req, res) => {
    try {
        res.render("appointment.ejs");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
});

// Show all appointments
router.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find({}).populate("doctor");
        res.render("appointments.ejs", { appointments });
    } catch (err) {
        console.error("Error fetching appointments:", err);
        res.status(500).send("Error fetching appointments");
    }
});

// Create a new appointment
router.post("/appointments", async (req, res) => {
    try {
        if (!req.body.appointment) {
            req.flash("error", "Invalid appointment data");
            return res.redirect("/appointment");
        }

        const newAppointment = new Appointment(req.body.appointment);
        await newAppointment.save();

        res.render("rating.ejs", { newAppointment });
    } catch (err) {
        console.error("Error saving appointment:", err);
        req.flash("error", "Error saving appointment");
        res.redirect("/appointment");
    }
});

// Save a rating for an appointment
router.post("/appointments/:id/rating", async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        await Appointment.findByIdAndUpdate(id, { rating });
        req.flash("success", "Rating saved successfully");
        res.redirect("/appointments");
    } catch (err) {
        console.error("Error saving rating:", err);
        req.flash("error", "Failed to save rating");
        res.redirect("/appointments");
    }
});

// Delete an appointment
router.delete("/appointments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment.deleteOne({ _id: id });
        req.flash("success", "Appointment deleted successfully");
        res.redirect("/appointments");
    } catch (err) {
        console.error("Error deleting appointment:", err);
        req.flash("error", "Failed to delete appointment");
        res.redirect("/appointments");
    }
});

module.exports = router;