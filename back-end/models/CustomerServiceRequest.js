

const mongoose = require('mongoose');

const CustomerServiceRequestSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['General Queries', 'Product Features Queries', 'Product Pricing Queries', 'Product Feature Implementation Requests'],
    required: true,
  },
  comments: {
    type: String,
    required: true,
  }
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
});

module.exports = mongoose.model('CustomerServiceRequest', CustomerServiceRequestSchema);
