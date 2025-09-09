const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['notice', 'event', 'tournament']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  organizer: {
    type: String,
    trim: true,
    maxlength: [100, 'Organizer cannot exceed 100 characters']
  },
  contactInfo: {
    type: String,
    trim: true,
    maxlength: [300, 'Contact info cannot exceed 300 characters']
  },
  // Tournament-specific fields
  rules: {
    type: String,
    trim: true,
    maxlength: [2000, 'Rules cannot exceed 2000 characters']
  },
  prizeStructure: {
    type: String,
    trim: true,
    maxlength: [1000, 'Prize structure cannot exceed 1000 characters']
  },
  registrationDeadline: {
    type: Date
  },
  maxParticipants: {
    type: Number,
    min: [1, 'Maximum participants must be at least 1']
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: [0, 'Current participants cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Validate that tournament-specific fields are provided for tournaments
noticeSchema.pre('save', function(next) {
  if (this.category === 'tournament') {
    if (!this.registrationDeadline) {
      return next(new Error('Registration deadline is required for tournaments'));
    }
    if (!this.maxParticipants) {
      return next(new Error('Maximum participants is required for tournaments'));
    }
  }
  next();
});

module.exports = mongoose.model('Notice', noticeSchema);