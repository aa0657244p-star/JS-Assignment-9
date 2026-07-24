var service = require('./notes.service');

exports.createNote = async (req, res) => {
  try {
    var userId = req.userId;
    var note = await service.createNote(userId, req.body);
    return res.status(201).json(note);
  } catch (err) {
    console.error('Create note error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const updated = await service.updateNote(noteId, userId, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Note not found or you are not the owner' });
    }
    return res.status(200).json(updated);
  } catch (err) {
    console.error('Update note error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.replaceNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const replaced = await service.replaceNote(noteId, userId, req.body);
    if (!replaced) {
      return res.status(404).json({ message: 'Note not found or you are not the owner' });
    }
    return res.status(200).json(replaced);
  } catch (err) {
    console.error('Replace note error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateAllNotesTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required bro' });
    }
    const count = await service.updateAllNotesTitle(userId, title);
    return res.status(200).json({ message: 'All notes updated', modifiedCount: count });
  } catch (err) {
    console.error('Update all notes error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const deleted = await service.deleteNote(noteId, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Note not found or you are not the owner' });
    }
    return res.status(200).json({ message: 'deleted', deleted });
  } catch (err) {
    console.error('Delete note error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await service.deleteAllNotes(userId);
    if (count === 0) {
      return res.status(404).json({ message: 'No note found' });
    }
    return res.status(200).json({ message: `Deleted ${count} notes` });
  } catch (err) {
    console.error('Delete all notes error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;
    const note = await service.getNoteById(noteId, userId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json(note);
  } catch (err) {
    console.error('Get note by id error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getNoteByContent = async (req, res) => {
  try {
    const userId = req.userId;
    const content = req.query.content;
    if (!content) {
      return res.status(400).json({ message: 'Content query parameter is required' });
    }
    const note = await service.getNoteByContent(userId, content);
    if (!note) {
      return res.status(404).json({ message: 'Note not found with that content' });
    }
    return res.status(200).json(note);
  } catch (err) {
    console.error('Get note by content error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getNotesWithUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await service.getNotesWithUserInfo(userId);
    return res.status(200).json(notes);
  } catch (err) {
    console.error('Get notes with user info error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getNotesAggregate = async (req, res) => {
  try {
    const userId = req.userId;
    const title = req.query.title;
    const notes = await service.getNotesAggregate(userId, title);
    return res.status(200).json(notes);
  } catch (err) {
    console.error('Aggregate notes error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPaginatedNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Page and limit must be positive integers' });
    }
    const data = await service.getPaginatedNotes(userId, page, limit);
    return res.status(200).json(data);
  } catch (err) {
    console.error('Paginated notes error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};