const express = require("express");
const Appointment = require("../../models/dashboard/Appointment");

const router = express.Router();

// ✅ Get upcoming appointments for a specific user
router.get("/my-upcoming/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("🔍 Fetching appointments for student ID:", userId);
    
    // Try multiple ways to find appointments for this user
    let appointments = await Appointment.find({ studentId: userId });
    
    // If no appointments found by studentId, try by email (in case userId is email)
    if (appointments.length === 0 && userId.includes('@')) {
      console.log("🔄 No appointments found by studentId, trying by email...");
      appointments = await Appointment.find({ studentEmail: userId });
    }
    
    // If still no appointments, try to find any appointments for debugging
    if (appointments.length === 0) {
      console.log("🔄 No appointments found, checking all appointments...");
      const allAppointments = await Appointment.find().limit(3);
      console.log("📊 Sample appointments in database:", allAppointments.map(a => ({
        studentId: a.studentId,
        studentEmail: a.studentEmail,
        counsellorId: a.counsellorId,
        slot: a.slot
      })));
    }

    console.log(`✅ Found ${appointments.length} appointments for student ${userId}`);
    
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching user appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get appointments for a specific counsellor
router.get("/counsellor/:counsellorId", async (req, res) => {
  try {
    const { counsellorId } = req.params;
    console.log("🔍 Fetching appointments for counsellor ID:", counsellorId);
    
    let appointments = await Appointment.find({ counsellorId });
    
    // If no appointments found, try to find any appointments for debugging
    if (appointments.length === 0) {
      console.log("🔄 No appointments found for counsellor, checking all appointments...");
      const allAppointments = await Appointment.find().limit(3);
      console.log("📊 Sample appointments in database:", allAppointments.map(a => ({
        studentId: a.studentId,
        studentEmail: a.studentEmail,
        counsellorId: a.counsellorId,
        slot: a.slot
      })));
      
      // Try to find by counsellor email if counsellorId looks like email
      if (counsellorId.includes('@')) {
        console.log("🔄 Trying to find counsellor by email in appointments...");
        // This is a fallback - in real scenario we'd need to match counsellor email to ID
      }
    }
    
    console.log(`✅ Found ${appointments.length} appointments for counsellor ${counsellorId}`);
    
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching counsellor appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    console.log(`📊 Total appointments in database: ${appointments.length}`);
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Debug route - get appointment count
router.get("/debug/count", async (req, res) => {
  try {
    const count = await Appointment.countDocuments();
    const appointments = await Appointment.find().limit(5); // Get first 5 for debugging
    
    // Also check what counsellor IDs we have
    const uniqueCounsellorIds = await Appointment.distinct('counsellorId');
    const uniqueStudentIds = await Appointment.distinct('studentId');
    
    res.json({
      totalCount: count,
      sampleAppointments: appointments,
      uniqueCounsellorIds,
      uniqueStudentIds,
      message: `Found ${count} appointments in database`
    });
  } catch (error) {
    console.error("❌ Error in debug count:", error);
    res.status(500).json({ error: "Failed to get appointment count" });
  }
});

// ✅ Create test appointment for debugging
router.post("/debug/create-test", async (req, res) => {
  try {
    const testAppointment = new Appointment({
      studentId: "test-student-123",
      studentName: "Test Student",
      studentEmail: "test@example.com",
      counsellorId: "test-counsellor-123",
      slot: "Tomorrow 10:00 AM → Tomorrow 11:00 AM",
      anonymous: false
    });
    
    await testAppointment.save();
    res.json({
      message: "Test appointment created",
      appointment: testAppointment
    });
  } catch (error) {
    console.error("❌ Error creating test appointment:", error);
    res.status(500).json({ error: "Failed to create test appointment" });
  }
});

// ✅ Create new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// ✅ Delete appointment (cancel)
router.delete("/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    console.log("🗑️ Cancelling appointment:", appointmentId);
    
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    
    console.log("✅ Appointment cancelled successfully");
    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    console.error("❌ Error cancelling appointment:", error);
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
});

module.exports = router;
