const express = require("express");
const {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNotebyId
} = require("../controllers/notesControllers");
const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNotebyId);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

module.exports = router;
