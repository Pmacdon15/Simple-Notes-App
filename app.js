import express from "express";
const app = express();

//const path = require("path");

import path from "path";

app.use(express.json());

import { getNotes, getNote, createNote, deleteNoteById } from "./database.js";

// Because of ES Modules
import { fileURLToPath } from "url"; // Import the necessary function from the 'url' module
const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename); // Get the directory name from the filename
app.use(express.urlencoded({ extended: true }));

// Add Route for js
app.use(express.static("client_side"));

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../notes/client_side/notes.html"));
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../notes/client_side/notes.html"));
});

app.get("/notes", async (req, res) => {
  const notes = await getNotes();

 
  if (req.accepts("json")) {
    // Send JSON response
    res.json({ notes });
  } else {
    // Handle other formats (optional)
    res.status(406).send("Not Acceptable");
  }
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  const notes = await getNotes();
  console.log("note id: " + note.id + " created");
  res.status(201).json({ note, notes });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteNoteById(id);
  const notes = await getNotes();
  console.log("note id: " + id + " deleted");
  res.status(200).json({ result, notes });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4455, () => {
  console.log("App listening on port 4455");
});
