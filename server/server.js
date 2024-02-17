require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const coverartRouter = require('./routes/coverart.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/coverart', coverartRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
