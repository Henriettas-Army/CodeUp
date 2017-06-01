const endorsementController = require('../../db/controllers/endorsementController');

const endorse = (req, res) => {
  endorsementController.postEndorsement(req.body)
  .then((endorsement) => {
    res.status(200).json({ 'Sent endorsement': endorsement });
  })
  .catch((e) => {
    res.send(e);
  });
};

module.exports = endorse;
