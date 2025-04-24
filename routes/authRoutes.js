const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const Appointment = require("../models/Appointment");
// const Doctor = require("./models/Doctor");
//const flashAndSession = require("./middleware/flashAndSession");
if(process.env.NODE_KEY != "production"){
    require('dotenv').config();
}

router.get("/register", (req, res) => {
    res.render("register.ejs");
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            req.flash("error", "Doctor already registered");
            return res.redirect("/register");
        }

        const doctor = new Doctor({ name, email, password, department });
        await doctor.save();

        req.flash("success", "Doctor registered successfully");
        res.redirect("/login");
    } catch (error) {
        console.error("Registration Error:", error);
        req.flash("error", "Registration failed");
        res.redirect("/register");
    }
});


// router.get("/mainLogin", (req, res) =>{
//     res.render("mainLogin.ejs");
// })

// router.post("/mainLogin", (req, res) => {
//     try {
//         const { password } = req.body; // Retrieve password from the request body
//         if (password === process.env.SECRET_KEY) {
//             return res.redirect("/register");
//         } else {
//             req.flash("error", "Invalid Password");
//             return res.redirect("/mainLogin");
//         }
//     } catch (error) {
//         console.error("Login Error:", error);
//         req.flash("error", "Login failed");
//         res.redirect("/mainLogin");
//     }
// });

router.get("/access", (req, res) => {
    res.render("access.ejs", { messages: req.flash() });
});


router.post("/access", async (req, res) => {
  

    const { accessCode } = req.body;

    if (accessCode === process.env.SECRET_kEY) {
        return res.redirect("/register"); // Doctor signup form
    } else if (accessCode === process.env.SECRET_REC) {
        const appointments = await Appointment.find().populate("doctor");
        return res.render("reception-dashboard.ejs", { appointments: appointments });
    } else {
        req.flash("error", "Invalid access code");
        return res.redirect("/access");
    }
});

router.get("/login", (req, res) => {
    res.render("login.ejs");
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            req.flash("error", "Doctor not found");
            return res.redirect("/login");
        }

        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            req.flash("error", "Invalid password");
            return res.redirect("/login");
        }

        req.session.doctorId = doctor._id;
        req.flash("success", "Login successful");
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Login Error:", error);
        req.flash("error", "Login failed");
        res.redirect("/login");
    }
});


// Logout route
router.get("/logout", (req, res) => { 

    req.flash("success", "Logged out successfully");

    req.session.destroy((err) => {
        if (err) {
            console.error("Logout Error:", err); 
            req.flash("error", "Logout failed");
            return res.redirect("/dashboard");
        }

        res.clearCookie("connect.sid"); 
        res.redirect("/"); 
    });
});

module.exports = router;