const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://uandersonmbc:teste123@cluster0-xopuw.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);