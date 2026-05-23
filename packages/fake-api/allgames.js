const fs = require("fs"),
  path = require("path"),
  express = require("express");

const allGamesRouter = express.Router();
const LANG = "it";

allGamesRouter.post("/init/viewer/:controllerId", (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/dogs6/`);
  try {
    const attemptFileName = `dogs6_init_${req.params.channelId}_${LANG}.json`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "dogs6_init_1_it.json";
    }
    res.sendFile(fullPath);
  } catch (err) {
    console.error(err);
  }
});

// http://localhost:9900/dogs6/event/info/1000001691/169
allGamesRouter.get(
  "/event/info/:monitor/:palimpsestId/:eventId",
  (req, res) => {
    const JSONpath = path.join(__dirname, `./fixtures/dogs6/`);
    try {
      // console.log(`event: ${req.params.palimpsestId}_${req.params.eventId}`);
      const attemptFileName = `dogs6_event_info_${req.params.palimpsestId}_${req.params.eventId}.json`;
      let fullPath = JSONpath + attemptFileName;
      if (!fs.existsSync(fullPath)) {
        fullPath = JSONpath + "dogs6_event_info_1000001691_169.json";
      }
      res.sendFile(fullPath);
    } catch (err) {
      console.error(err);
    }
  }
);
module.exports = allGamesRouter;
