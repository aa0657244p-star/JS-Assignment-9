var service = require('./auth.service');

exports.signup = async (req, res) => {
  try {
    const result = await service.signup(req.body);
    return res.status(result.success ? 201 : 400).json({ message: result.message });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await service.login(email, password);
    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message, token: result.token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await service.updateUser(userId, req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message });
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await service.deleteUser(userId);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await service.getUserById(userId);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }
    return res.status(200).json(result.user);
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};