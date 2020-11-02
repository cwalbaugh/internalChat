var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/internalChat");
var chatSchema = new mongoose.Schema({
    chat: String,
    user: {
        type: String,
        'default': "cwalbaugh"
    }
});
var Chat = mongoose.model("Chat", chatSchema);

app.get("/", (req, res) => {
});

app.post("/chat", (req, res) => {
    var chatData = new Chat(req.body);
    chatData.save()
        .then(item => {
            res.sendFile(__dirname + "/index.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
