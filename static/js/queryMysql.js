var mysql = require('mysql');


function queryMysql() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "astro"
    });
    con.connect((err) => {
        if(err) throw err;
        console.log("Connected!");
        con.query("USE mydb;", (err, result) => {
            if(err) throw err;
            console.log("use mydb;");
        });
        con.query("SELECT * FROM events;", (err, result, fields) => {
            if(err) throw err;
            console.log(result);
        });
    });
}

