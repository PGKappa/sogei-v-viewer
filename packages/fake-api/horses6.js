const fs = require('fs'),
  path = require('path'),
  express = require('express')


const horses6Router = express.Router();

horses6Router.post('/init/viewer/:monitor/:channelId', (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/horses6/`);
  try {
    const attemptFileName = `horses6_init_${req.params.channelId}`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "horses6_init_3_en.json";
    }
    res.sendFile(fullPath)
  } catch (err) {
    console.error(err)
  }
});

horses6Router.get('/event/info/:monitor/:palimpsestId/:eventId', (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/horses6/`);
  try {
    const attemptFileName = `horses6_event_info_${req.params.palimpsestId}_${req.params.eventId}.json`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "horses6_event_info_3000001701_151.json";
    }
    res.sendFile(fullPath)
  } catch (err) {
    console.error(err)
  }
});


module.exports = horses6Router;