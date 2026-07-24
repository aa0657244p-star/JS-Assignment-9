var mongoose = require('mongoose');

function notAllUppercase(val) {
  return val !== val.toUpperCase();
}

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: notAllUppercase,
      message: 'Title cannot be all uppercase letters'
    }
  },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

noteSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;