const express = require('express');
const router = express.Router();
//  response header
router.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.use('/event', require('./event/index.js'));
router.use('/staff', require('./staff/index.js'));
module.exports = router; 