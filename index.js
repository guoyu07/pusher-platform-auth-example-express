var express = require('express');
var bodyParser = require('body-parser');

var pusher = require("pusher-platform");

var pusherApp = new pusher.App({
  cluster: process.env.PUSHER_CLUSTER,
  appId: process.env.PUSHER_APP_ID,
  appKey: process.env.PUSHER_APP_KEY,
});

var app = express();

app.post('/auth', bodyParser.urlencoded({ extended: true }), function (req, res) {
  pusherApp.authenticate(req, res, {
    userID: req.query["user_id"],
  });
});

app.post('/append', bodyParser.text({ type: "*/*" }), function (req, res) {
  pusherApp.request({
    method: "POST",
    path: "feeds/playground",
    body: pusher.writeJSON({
      items: [req.body],
    }),
  }).then(function() {
    console.log("Successfully appended", req.body, "to the playground feed");
    res.sendStatus(204);
  }).catch(function(e) {
    console.log("Error while appending to the playground feed:", e);
    res.sendStatus(500);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Pusher Platform auth example listening on port ' + port);
});
