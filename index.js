// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/librarydb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number
});
const Book = mongoose.model("Book", bookSchema);

// Routes
// Get all books
app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add new book
app.post("/api/books", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

// Update book by ID
app.put("/api/books/:id", async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
});

// Delete book by ID
app.delete("/api/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
});

// Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
