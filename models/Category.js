//define model ==============
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = new Schema ({
  text: String,
  sort: { type: Number, default: -1},
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Category', Category);
