const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { conn } = require("./oracle/oracle");
const router = require("./router/index.js");
//  oracle
conn(() => {
    //  server
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //  static
    app.use("/cim", express.static(__dirname + "/cim"));
    app.use("/static", express.static(__dirname + "/cim/static"));
    //  router
    app.use("/", router);
    //  listen
    app.listen(port, () => console.log("server on 3000"));
});
