const eventHelper = require('../../db/controllers/eventHelper');

module.exports = {
  postEvent: (req, res) => {
    eventHelper.addEvent(req.body)
    .then((event) => {
      res.status(200).json({ event, ok: true });
    })
    .catch((error) => {
      res.status(200).json({ ok: false, error });
    });
  },
  getEvents: (req, res) => {
    eventHelper.getEvents()
    .then(evts => res.status(200).json({ events: evts.sort((a, b) => a.date - b.date), ok: true }))
    .catch(error => res.status(200).json({ ok: false, error }));
  },
  deleteEvent: (req, res) => {
    eventHelper.deleteEvent(req.body.id)
      .then(() => res.json({ ok: true }))
      .catch(error => res.json({ status: 'error', error }));
  }
};
