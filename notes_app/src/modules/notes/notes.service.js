var Note = require('../../models/Note.model');

exports.createNote = async (userId, data) => {
  var note = new Note({
    title: data.title,
    content: data.content,
    userId: userId
  });
  await note.save();
  return note;
};

exports.updateNote = async (noteId, userId, data) => {
  var note = await Note.findOne({ _id: noteId, userId });
  if (!note) return null;
  if (data.title) note.title = data.title;
  if (data.content) note.content = data.content;
  note.updatedAt = new Date();
  await note.save();
  return note;
};

exports.replaceNote = async (noteId, userId, newData) => {
  const note = await Note.findOne({ _id: noteId, userId });
  if (!note) return null;
  note.title = newData.title;
  note.content = newData.content;
  note.updatedAt = newData.updatedAt || new Date();
  await note.save();
  return note;
};

exports.updateAllNotesTitle = async (userId, newTitle) => {
  const result = await Note.updateMany(
    { userId },
    { title: newTitle, updatedAt: new Date() }
  );
  return result.modifiedCount;
};

exports.deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, userId });
  return note;
};

exports.deleteAllNotes = async (userId) => {
  const result = await Note.deleteMany({ userId });
  return result.deletedCount;
};

exports.getNoteById = async (noteId, userId) => {
  return await Note.findOne({ _id: noteId, userId });
};

exports.getNoteByContent = async (userId, content) => {
  return await Note.findOne({ userId, content: { $regex: content, $options: 'i' } });
};

exports.getNotesWithUserInfo = async (userId) => {
  const notes = await Note.find({ userId })
    .select('title userId createdAt')
    .populate('userId', 'email');
  return notes;
};

exports.getNotesAggregate = async (userId, titleFilter) => {
  const pipeline = [
    { $match: { userId: userId } },
    ...(titleFilter ? [{ $match: { title: { $regex: titleFilter, $options: 'i' } } }] : []),
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userInfo'
      }
    },
    { $unwind: '$userInfo' },
    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        'userInfo.name': 1,
        'userInfo.email': 1
      }
    }
  ];
  return await Note.aggregate(pipeline);
};

exports.getPaginatedNotes = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const notes = await Note.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Note.countDocuments({ userId });
  return { notes, total, page, limit };
};