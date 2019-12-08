//define model ==============
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Todo = new Schema({
  text: String,
  priority: { type: Number, default: 1 },
  sort: { type: Number, default: -1 },
  deleted: { type: Boolean, default: false },
  category: ObjectId,
  createdAt: { type: Date, default: Date.now },
  modifiedAt:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', Todo);
