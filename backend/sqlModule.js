const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const CREDENTIALS_PATH = path.join(process.cwd() + '/credentials/sql_credentials.json');

var mysql = require('mysql');

// Create a connection to the SQL database
async function createConnection() {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);

    var con = mysql.createConnection({
        host: keys.host,
        user: keys.user,
        password: keys.password,
        database: keys.database
    });

    con.connect(function (err) {
        if (err) {
            return console.error("Failed to connect to the MySQL server.\n\tError: " + err.message);
        }

        console.log('Connected to the MySQL server.');
    });

    return await con;
}

// Send a query to the SQL database
async function makeQuery({query: query}) {
    let con = await createConnection();

    // console.log(query);
    const resultPromise = new Promise((resolve, reject) => {
        con.query(query, function (err, result, fields) {
            if (err) {
                return console.error("Failed to make query to the MySQL server.\n\tError: " + err.message);
            }
            // console.log("Actual Result");
            // console.log(result);
            console.log("Made query to the MySQL server.");
            resolve(result);
        });
    });

    return resultPromise;
}

module.exports = { createConnection, makeQuery };