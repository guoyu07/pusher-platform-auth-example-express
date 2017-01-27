var express = require('express');
var bodyParser = require('body-parser');

var pusher = require("pusher-platform");

var pusherApp = new pusher.App({
  cluster: process.env.PUSHER_CLUSTER,
  appID: process.env.PUSHER_APP_ID,
  appKey: process.env.PUSHER_APP_KEY,
});

var app = express();

app.post('/auth', bodyParser.urlencoded({ extended: true }), function (req, res) {
  pusherApp.authenticate(req, res, {
    userID: req.query["user_id"],
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Pusher Platform auth example listening on port ' + port);
});
