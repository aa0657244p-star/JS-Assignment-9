var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { encrypt, decrypt } = require('../common/encryption');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, min: 18, max: 60 }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('phone')) {
    this.phone = encrypt(this.phone);
  }
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getDecryptedPhone = function() {
  return decrypt(this.phone);
};

const User = mongoose.model('User', userSchema);
module.exports = User;