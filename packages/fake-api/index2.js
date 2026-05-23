const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));

// app.get('/', (req, res) => {
//   res.send(JSON)
// })
app.post('/', (req, res) => {
  res.send("ok");
  console.log("post!!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
