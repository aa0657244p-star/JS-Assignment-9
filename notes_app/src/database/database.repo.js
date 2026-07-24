var User = require('../models/User.model');
const Note = require('../models/Note.model');

class DatabaseRepo {
  static async findOne(model, filter) {
    return await model.findOne(filter);
  }

  static async findMany(model, filter, options = {}) {
    return await model.find(filter, null, options);
  }

  static async create(model, data) {
    return await model.create(data);
  }

  static async updateOne(model, filter, data, options = { new: true }) {
    return await model.findOneAndUpdate(filter, data, options);
  }

  static async updateMany(model, filter, data) {
    return await model.updateMany(filter, data);
  }

  static async deleteOne(model, filter) {
    return await model.findOneAndDelete(filter);
  }

  static async deleteMany(model, filter) {
    return await model.deleteMany(filter);
  }

  static async count(model, filter) {
    return await model.countDocuments(filter);
  }
}

module.exports = DatabaseRepo;