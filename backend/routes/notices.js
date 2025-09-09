const express = require('express');
const Notice = require('../models/Notice');
const TournamentRegistration = require('../models/TournamentRegistration');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateNotice, validateTournamentRegistration } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/notices
// @desc    Get all notices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, isActive } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (category && category !== 'all') query.category = category;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    // Execute query with pagination
    const notices = await Notice.find(query)
      .populate('createdBy', 'username')
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notice.countDocuments(query);

    res.json({
      success: true,
      data: {
        notices,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get notices error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notices'
    });
  }
});

// @route   GET /api/notices/:id
// @desc    Get single notice
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('createdBy', 'username')
      .select('-__v');
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      data: { notice }
    });
  } catch (error) {
    console.error('Get notice error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid notice ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notice'
    });
  }
});

// @route   POST /api/notices
// @desc    Create new notice
// @access  Private (Admin only)
router.post('/', authenticate, requireAdmin, validateNotice, async (req, res) => {
  try {
    const notice = new Notice({
      ...req.body,
      createdBy: req.user._id
    });
    
    await notice.save();
    await notice.populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: { notice }
    });
  } catch (error) {
    console.error('Create notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating notice'
    });
  }
});

// @route   PUT /api/notices/:id
// @desc    Update notice
// @access  Private (Admin only)
router.put('/:id', authenticate, requireAdmin, validateNotice, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username').select('-__v');

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: { notice }
    });
  } catch (error) {
    console.error('Update notice error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid notice ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating notice'
    });
  }
});

// @route   DELETE /api/notices/:id
// @desc    Delete notice
// @access  Private (Admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    console.error('Delete notice error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid notice ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting notice'
    });
  }
});

// @route   POST /api/notices/:id/register
// @desc    Register for tournament
// @access  Public
router.post('/:id/register', validateTournamentRegistration, async (req, res) => {
  try {
    const { name, skbId } = req.body;
    const tournamentId = req.params.id;

    // Check if tournament exists and is active
    const tournament = await Notice.findOne({
      _id: tournamentId,
      category: 'tournament',
      isActive: true
    });

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found or not active'
      });
    }

    // Check if registration deadline has passed
    if (tournament.registrationDeadline && new Date() > tournament.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    // Check if tournament is full
    if (tournament.maxParticipants && tournament.currentParticipants >= tournament.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Tournament is full'
      });
    }

    // Check if user is already registered
    const existingRegistration = await TournamentRegistration.findOne({
      skbId,
      tournamentId
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this tournament'
      });
    }

    // Create registration
    const registration = new TournamentRegistration({
      name,
      skbId,
      tournamentId
    });

    await registration.save();

    // Update participant count
    tournament.currentParticipants += 1;
    await tournament.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { registration }
    });
  } catch (error) {
    console.error('Tournament registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this tournament'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   GET /api/notices/:id/registrations
// @desc    Get tournament registrations
// @access  Private (Admin only)
router.get('/:id/registrations', authenticate, requireAdmin, async (req, res) => {
  try {
    const registrations = await TournamentRegistration.find({
      tournamentId: req.params.id
    }).sort({ registrationDate: -1 });

    res.json({
      success: true,
      data: { registrations }
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registrations'
    });
  }
});

module.exports = router;