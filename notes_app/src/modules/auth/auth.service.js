var User = require('../../models/User.model');
const jwt = require('jsonwebtoken');

exports.signup = async (userData) => {
  const { email, name, password, phone, age } = userData;
  const existing = await User.findOne({ email });
  if (existing) {
    return { success: false, message: 'Email already exists.' };
  }

  const newUser = new User({ name, email, password, phone, age });
  await newUser.save();
  return { success: true, message: 'User added successfully.' };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return { success: false, message: 'Invalid email or password' };
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { success: true, token, message: 'Login successful bro' };
};

exports.updateUser = async (userId, updateData) => {
  if (updateData.email) {
    const existing = await User.findOne({ email: updateData.email, _id: { $ne: userId } });
    if (existing) {
      return { success: false, message: 'Email already exists' };
    }
  }
  delete updateData.password;

  const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
  if (!updated) {
    return { success: false, message: 'User not found' };
  }
  return { success: true, message: 'User updated', user: updated };
};

exports.deleteUser = async (userId) => {
  const deleted = await User.findByIdAndDelete(userId);
  if (!deleted) {
    return { success: false, message: 'User not found' };
  }
  return { success: true, message: 'User deleted' };
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId).select('-__v');
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  const userObj = user.toObject();
  userObj.phone = user.getDecryptedPhone();
  return { success: true, user: userObj };
};