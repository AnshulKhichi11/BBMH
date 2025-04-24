const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Appointment = require("./models/Appointment");
const Doctor = require("./models/Doctor");
const methodOverride = require('method-override');
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const doctorRoutes = require("./routes/doctorsRoute");
const { isAuthenticated } = require("./middleware/middleware");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const doctorScheduleRoutes = require("./routes/doctorScheduleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const flashAndSession = require("./middleware/flashAndSession");
if(process.env.NODE_KEY != "production"){
    require('dotenv').config();
}
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(cors());

// Use flash and session middleware
flashAndSession(app);


// MongoDB connection
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BangerDB');
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
main();


//  API to get doctors based on specialization (fixing disease mismatch)
app.get("/doctors", async (req, res) => {
    const { department } = req.query;
    try {
        const doctors = await Doctor.find({ department: department });
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found for this department." });
        }
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ error: "Server error" });
    }
});




// Use the doctor schedule routes
app.use(doctorScheduleRoutes);


//login,register , logout
app.use(authRoutes);

// Use the dashboard routes
app.use(dashboardRoutes);


// Use the availability routes
app.use(availabilityRoutes);


// Public routes
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/blogs", (req, res) => res.render("blogs.ejs"));
app.get("/news", (req, res) => res.render("news.ejs"));
app.get("/aboutBBMH", (req, res) => res.render("about.ejs"));
app.get("/doct", (req, res) => res.render("doctors.ejs"));
app.get("/empanelments", (req, res) => res.render("empalenments.ejs"));
app.get("/specialities", (req, res) => res.render("specialities.ejs"));

// Speciality routes
const specialities = ["ent", "Gynecology", "Gastrology", "Neurosurgery", "JointReplacement",
    "Orthopedic", "Plasticsurgery", "SportsInjuries", "Urology"];
    specialities.forEach(route => {
    app.get(`/${route}`, (req, res) => res.render(`${route}.ejs`));
});



// doctorinfo routes
app.use(doctorRoutes);
  
// Use the appointment routes
app.use(appointmentRoutes);


const port = 3000;
app.listen(port, () => {
    console.log(`App working at ${port}`);
});