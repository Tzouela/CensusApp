const express = require('express');
const router  = express.Router();
const validateSchema = require('../middleware/validateSchema');
const ParticipantService = require('../services/ParticipantService');
const participantService = new ParticipantService();

// POST   /participants/add
router.post(
  '/add',
  validateSchema,
  async (req, res, next) => {
    try {
      const created = await participantService.addParticipant({
        participant: req.body.participant,
        work:        req.body.work,
        home:        req.body.home
      });
      res.status(201).json(created);
    } catch (err) {
      // any validation or DB errors land here
      next(err);
    }
  }
);

// GET    /participants
router.get('/', async (req, res, next) => {
  try {
    const list = await participantService.listParticipants();
    res.json(list);
  } catch (err) { next(err); }
});

// GET    /participants/details
router.get('/details', async (req, res, next) => {
  try {
    const all = await participantService.detailsAll();
    res.json(all);
  } catch (err) { next(err); }
});

// GET    /participants/details/:email
router.get('/details/:email', async (req, res, next) => {
  try {
    const p = await participantService.detailsByEmail(req.params.email);
    res.json(p);
  } catch (err) { next(err); }
});

// GET    /participants/work/:email
router.get('/work/:email', async (req, res, next) => {
  try {
    const w = await participantService.workByEmail(req.params.email);
    res.json(w);
  } catch (err) { next(err); }
});

// GET    /participants/home/:email
router.get('/home/:email', async (req, res, next) => {
  try {
    const h = await participantService.homeByEmail(req.params.email);
    res.json(h);
  } catch (err) { next(err); }
});

// PUT    /participants/:email
router.put('/:email', validateSchema, async (req, res, next) => {
    try {
      const updated = await participantService.updateParticipant(
        req.params.email,
        req.body
      );
      res.json(updated);
    } catch (err) { next(err); }
  });

// DELETE /participants/:email
router.delete('/:email', async (req, res, next) => {
  try {
    await participantService.deleteParticipant(req.params.email);
    res.status(204).end();
  } catch (err) { next(err); }
});


module.exports = router;