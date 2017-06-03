const express = require('express');
const jwt = require('jsonwebtoken');
const eventHelper = require('../../db/controllers/eventHelper');

const router = express.Router();

router.post('/', (req, res) => {
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
});

router.get('/', (req, res) => {
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
});

router.post('/delete', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'codeupforever', ((err) => {
    if (err) {
      res.send(`${err.name}: Please sign in again to renew your session`);
    } else {
      eventHelper.deleteEvent(req.body.id)
        .then(() => res.json({ ok: true }))
        .catch(error => res.json({ status: 'error', error }));
    }
  }));
});

router.put('/', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'codeupforever', ((err) => {
    if (err) {
      res.send(`${err.name}: Please sign in again to renew your session`);
    } else {
      const body = req.body;
      const data = {};
      body.toUpdate.forEach((update) => {
        data[update.typeUpdate] = update.data;
      });
      if (data.pinned) {
        eventHelper.getAnEvent(body.id)
          .then((event) => {
            event.pinned.push(data.pinned);
            data.pinned = event.pinned;
            eventHelper.updateEvent(body.id, data)
            .then((e) => {
              res.status(200).json({ e, ok: true });
            })
            .catch((error) => {
              res.status(200).json({ ok: false, error });
            });
          });
      } else {
        eventHelper.updateEvent(body.id, data)
        .then((event) => {
          res.status(200).json({ event, ok: true });
        })
        .catch((error) => {
          res.status(200).json({ ok: false, error });
        });
      }
    }
  }));
});

router.put('/edit', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'codeupforever', ((err, decoded) => {
    if (err) {
      res.send(`${err.name}: Please sign in again to renew your session`);
    } else {
      eventHelper.editEvent(req.body, decoded)
      .then((event) => {
        res.status(200).json({ event, ok: true });
      })
      .catch((error) => {
        res.status(200).json({ ok: false, error });
      });
    }
  }));
});

module.exports = router;
