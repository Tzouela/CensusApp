const express = require('express');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema');
const ParticipantService = require('../services/ParticipantService');
const { ensureAdminBasicAuth } = require('../middleware/auth');

const participantService = new ParticipantService();

router.post('/add', validateSchema, ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const created = await participantService.addParticipant({
      participant: req.body.participant,
      work: req.body.work,
      home: req.body.home
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}
);

router.get('/', ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const list = await participantService.listParticipants();
    res.json(list);
  } catch (err) { next(err); }
});

router.get('/details', ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const all = await participantService.detailsAll();
    res.json(all);
  } catch (err) { next(err); }
});

router.get('/details/:email', ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const p = await participantService.detailsByEmail(req.params.email);
    res.json(p);
  } catch (err) { next(err); }
});

router.get('/work/:email', ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const w = await participantService.workByEmail(req.params.email);
    res.json(w);
  } catch (err) { next(err); }
});

router.get('/home/:email', ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const h = await participantService.homeByEmail(req.params.email);
    res.json(h);
  } catch (err) { next(err); }
});

router.put('/:email', validateSchema, ensureAdminBasicAuth, async (req, res, next) => {
  try {
    const updated = await participantService.updateParticipant(
      req.params.email,
      req.body
    );
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/:email', ensureAdminBasicAuth, async (req, res, next) => {
  try {
    await participantService.deleteParticipant(req.params.email);
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;