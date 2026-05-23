const fs = require('fs'),
  path = require('path'),
  express = require('express');

const trotting8Router = express.Router();

trotting8Router.post('/init/viewer/:monitor/:channelId', (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/trotting8/`);
  try {
    const attemptFileName = `trotting8_init_${req.params.channelId}`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "trotting8_init_4_en.json";
    }
    res.sendFile(fullPath)
  } catch (err) {
    console.error(err)
  }
});

trotting8Router.get('/event/info/:monitor/:palimpsestId/:eventId', async (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/trotting8/`);
  try {
    const attemptFileName = `trotting8_event_info_${req.params.palimpsestId}_${req.params.eventId}.js`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "trotting8_event_info_4000000062_148.js";
    }
    const a = await import(fullPath);
    
    res.send(a.default);
    // res.sendFile(fullPath)
  } catch (err) {
    console.error(err)
  }
});


module.exports = trotting8Router;