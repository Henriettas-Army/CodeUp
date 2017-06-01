const jwt = require('jsonwebtoken');
const eventHelper = require('../../db/controllers/eventHelper');

module.exports = {
  postEvent: (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'codeupforever', ((err, decoded) => {
      if (err) {
        res.send(`${err.name}: Please sign in again to renew your session`);
      } else {
        eventHelper.addEvent(req.body, decoded)
        .then((event) => {
          res.status(200).json({ event, ok: true });
        })
        .catch((error) => {
          res.status(200).json({ ok: false, error });
        });
      }
    }));
  },
  getEvents: (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'codeupforever', ((err) => {
      if (err) {
        res.send(`${err.name}: Please sign in again to renew your session`);
      } else {
        eventHelper.getEvents()
        .then(evts => res.status(200).json({
          events: evts.sort((a, b) => a.date - b.date),
          ok: true }))
        .catch(error => res.status(200).json({ ok: false, error }));
      }
    }));
  },
  deleteEvent: (req, res) => {
    eventHelper.deleteEvent(req.body.id)
      .then(() => res.json({ ok: true }))
      .catch(error => res.json({ status: 'error', error }));
  }
};
