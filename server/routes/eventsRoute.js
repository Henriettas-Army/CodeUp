const eventHelper = require('../../db/controllers/eventHelper');

module.exports = {
  postEvent: (req, res) => {
    eventHelper.addEvent(req.body)
    .then((evt) => {
      res.status(200).send(`success insert event ${evt}`);
    })
    .catch((err) => {
      res.status(400).send(`Error: ${err}`);
    });
  },
  getEvents: (req, res) => {
    eventHelper.getEvents()
    .then(evts => res.status(200).send(JSON.stringify(evts)))
    .catch(err => res.status(400).send(err));
  },
};
