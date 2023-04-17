const fs = require('fs').promises;
const path = require('path');
const process = require('process');

// const CREDENTIALS_PATH = path.join(process.cwd() + '/credentials/sql_credentials.json');

var mysql = require('mysql');
const { sql } = require('googleapis/build/src/apis/sql');
var connection;

// Create a connection to the SQL database
// host: keys.host,
// user: keys.user,
// password: keys.password,
// database: keys.database
async function createConnection() {
    // const content = await fs.readFile(CRsEDENTIALS_PATH);
    // const keys = JSON.parse(content);
    var con = mysql.createConnection({
        "host": process.env.SQL_HOST,
        "user": process.env.SQL_USER,
        "password": process.env.SQL_PASSWORD,
        "database": process.env.SQL_DATABASE
    });

    con.connect(function (err) {
        if (err) {
            return console.error("Failed to connect to the MySQL server.\n\tError: " + err.message);
        }

        console.log('Connected to the MySQL server.');
    });

    return await con;
}

async function getConnection() {
    if (connection == null) {
        connection = await createConnection();
    }
    return connection;
}


// Send a query to the SQL database
async function makeQuery({ query: query }) {
    // let con = createConnection();
    let con = await getConnection();

    // console.log(query);
    const resultPromise = new Promise((resolve, reject) => {
        con.query(query, function (err, result, fields) {
            if (err) {
                console.log(query);
                return console.error("Failed to make query to the MySQL server.\n\tError: " + err.message);
            }
            // console.log("Actual Result");
            // console.log(result);
            // console.log("Made query to the MySQL server.");
            resolve(result);
        });
    });

    return resultPromise;
}

module.exports = { createConnection, makeQuery };