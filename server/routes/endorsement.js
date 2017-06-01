const User = require('../../db/models/User');
const jwt = require('jsonwebtoken');
const endorsementController = require('../../db/controllers/endorsementController');

const endorse = (req, res) => {
  const endorsement = req.body;
  const endorserUsername = jwt.decode(endorsement.endorserToken, 'codeupforever');
  delete endorsement.endorserToken;

  User.findOne({ username: endorserUsername })
  .then(doc => doc.toObject().img)
  .then((endorserImg) => {
    const end = Object.assign({}, endorsement, { endorserImg }, { endorserUsername });
    endorsementController.postEndorsement(end)
    .then((storedEnd) => {
      res.status(200).json({ 'Sent endorsement': storedEnd });
    })
    .catch((e) => {
      res.send(e);
    });
  })
  .catch((e) => {
    res.send(e);
  });
};

module.exports = endorse;
