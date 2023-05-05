const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
const compression = require("compression");

const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit') //https://www.npmjs.com/package/express-rate-limit look into this
const passport = require('./middleware/passport');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(cors());
app.use(express.json())
app.use(helmet());
// app.use(hpp());
app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 72 * 60 * 60 * 1000)
    })
)
app.use(passport.initialize());

var cookieParser = require('cookie-parser')
const csrf = require("csurf");
const csrfProtection = csrf({
    cookie: true,
});

app.use(cookieParser())

app.use(csrfProtection);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// if (process.env.NODE_ENV == "development") {
app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
});
// }

console.log("Automatically running here!");

// const session = require('express-session')
// router.use(session({
//     name: "test",
//     secret: "test",
//     cookie: { maxAge: 3 * 60 * 60 * 1000 },
//     resave: false,
//     saveUninitialized: false
// }))

// databaseSync.sync({sheetID: sourceSheetsID});
// databaseSync.exportSqlToSheets(exportSheetsID);
// databaseSync.writeNewEntriesToSQL(sourceSheetsID);

// let sender_id = 3;
// let receiver_id = 4;
// let body = "Message from index.js";
// let result = sqlAccess.writeMessageToSQL(sender_id, receiver_id, body);
// console.log(result);

// let result = sqlAccess.readMessageFromSQLByReceiverID(receiver_id);

// let yearFilters = [
//     1111, 2017, 2004, 2012, 2022
// ];
// let academyFilters = [
//     "\"AMST\"", "\"ATCS\""
// ]
// let test = sqlAccess.readAlumniDataWithFilter(yearFilters, academyFilters);
// console.log(test);

// sqlAccess.writeConversation(0, 1);
// sqlAccess.writeConversation(0, 2);
// sqlAccess.writeConversation(1, 2);
// sqlAccess.readConversation(0);

const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

const chatAccess = require('./chatAccess.js');

chatAccess.setWSS(wss);

http.createServer(chatAccess.accept).listen(8080);