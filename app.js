// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB error', err));

// ========== MODELS ==========
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  department: { type: String, required: true }
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  credits: { type: Number, default: 3 }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);

// ========== ROUTES ==========

// Health check
app.get('/', (req, res) => res.send('📚 School API is running...'));

/* ---- STUDENTS ---- */
// CREATE
app.post('/api/students', async (req, res) => {
  try {
    const saved = await Student.create(req.body);
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ
app.get('/api/students', async (req, res) => {
  try {
    const all = await Student.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ---- COURSES ---- */
// CREATE
app.post('/api/courses', async (req, res) => {
  try {
    const saved = await Course.create(req.body);
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ
app.get('/api/courses', async (req, res) => {
  try {
    const all = await Course.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(🚀 Server running on port ${PORT}));
