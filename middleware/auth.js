const auth = require('basic-auth');
const db   = require('../models');

async function ensureAdminBasicAuth(req, res, next) {
  const creds = auth(req);
  if (!creds || !creds.name || !creds.pass) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ error: 'Authentication required' });
  }

  const admin = await db.Admin.findOne({ where: { username: creds.name } });
  if (!admin || admin.password !== creds.pass) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.user = { username: admin.username, isAdmin: true };
  next();
}

module.exports = { ensureAdminBasicAuth };