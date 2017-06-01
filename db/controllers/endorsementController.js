const User = require('../models/User');

module.exports = {
  postEndorsement: endorsement => (
    User.findOne({ username: endorsement.endorsee }, 'endorsements')
      .then(doc => doc.toObject().endorsements)
      .then(ends => (
        User.findOneAndUpdate({ username: endorsement.endorsee },
          { endorsements: ends.concat(endorsement) }))
        )
      .then(() => endorsement)
      .catch(e => e)
    )
};
