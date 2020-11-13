const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { conn } = require("./oracle/oracle");
//  server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/cim", express.static(__dirname + "/cim"));
app.listen(port, () => console.log("server on 3000"));
conn();

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});