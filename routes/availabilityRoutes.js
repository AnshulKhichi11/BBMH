const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Update availability route
router.post("/updateAvailability", async (req, res) => {
    try {
        let { availableDates, availableTime } = req.body;

        // Convert string of dates to an array
        availableDates = availableDates ? availableDates.split(", ") : [];

        if (!req.session.doctorId) {
            req.flash("error", "Session expired. Please log in again.");
            return res.redirect("/login");
        }

        // Update MongoDB document
        const updateFields = {};
        if (availableDates.length) updateFields.availableDates = availableDates;
        if (availableTime) updateFields.availableTime = availableTime;

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.session.doctorId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            console.log(" Doctor not found!");
            req.flash("error", "Doctor not found");
            return res.redirect("/dashboard");
        }

        req.flash("success", "Availability updated successfully");
        res.redirect("/");
    } catch (error) {
        console.error(" Update Error:", error);
        req.flash("error", "Failed to update availability");
        res.redirect("/dashboard");
    }
});

module.exports = router;