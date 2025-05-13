const express = require('express');
const router  = express.Router();

const adminAuth           = require('../middleware/auth.middleware');
const validateParticipant = require('../middleware/validateParticipant');
const ParticipantService  = require('../services/participant.service');


module.exports = router;