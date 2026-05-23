const fs = require("fs"),
  path = require("path"),
  express = require("express");

const dogs6Router = express.Router();
const LANG = "it";

dogs6Router.post("/init/viewer/:monitor", (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/dogs6/`);
  try {
    const attemptFileName = `isibet_init.json`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "isibet_init.json.json";
    }
    res.sendFile(fullPath);
  } catch (err) {
    console.error(err);
  }
});

// http://localhost:9900/dogs6/event/info/1000001691/169
dogs6Router.get("/event/info/:monitor/:palimpsestId/:eventId", (req, res) => {
  const JSONpath = path.join(__dirname, `./fixtures/dogs6/`);
  try {
    // console.log(`event: ${req.params.palimpsestId}_${req.params.eventId}`);
    const attemptFileName = `json-evento-${req.params.palimpsestId}_${req.params.eventId}.json`;
    let fullPath = JSONpath + attemptFileName;
    if (!fs.existsSync(fullPath)) {
      fullPath = JSONpath + "json-evento-1000001669-28.json";
    }

    const j = JSON.parse(fs.readFileSync(fullPath));
    const d = new Date();

    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    let m = d.getMinutes();
    let s = d.getSeconds();
    console.log(m);
    let since = 300;
    for (let i = 0; i < minutes.length; i++) {
      if (minutes[i] <= m && minutes[i + 1] > m) {
        since = (minutes[i + 1] - m) * 60 - s;
        console.log(`${minutes[i]} ${m} ${minutes[i + 1]} ${since}`);
        m = i + 1;

        break;
      }
    }
    if (m > 11) m = 0;

    // Ottieni i minuti correnti

    d.setMinutes(minutes[m]);
    console.log(d);
    const ore = d.getHours().toString().padStart(2, "0"); // Formatta l'ora con un zero all'inizio se necessario
    const minuti = d.getMinutes().toString().padStart(2, "0");
    j.current["start_time"] = `${ore}:${minuti}`;
    j.current["since"] = since;
    console.log(j.current.start_time);

    res.json(j);
  } catch (err) {
    console.error(err);
  }
});
module.exports = dogs6Router;
