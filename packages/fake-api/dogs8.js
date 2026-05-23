const fs = require('fs'),
  path = require('path'),
  express = require('express');

const dogs8Router = express.Router();

dogs8Router.post('/init/viewer/:monitor/channelId', (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/dogs8/`);
  try {
    const attemptFileName = `dogs8_init_${req.params.channelId}.json`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "dogs8_init_2_en.json";
    }
    res.sendFile(fullPath);
  } catch (err) {
    console.error(err)
  }
});

dogs8Router.get('/event/info/:monitor/:palimpsestId/:eventId', (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/dogs8/`);
  try {
    const attemptFileName = `dogs8_event_info_${req.params.palimpsestId}_${req.params.eventId}.json`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "dogs8_event_info_2000000058_148.json";
    }
    res.sendFile(fullPath)
  } catch (err) {
    console.error(err)
  }
});
module.exports = dogs8Router;