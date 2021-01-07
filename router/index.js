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
//  cim 平台
router.use('/event', require('./cim-modules/event.js'));
router.use('/staff', require('./cim-modules/staff.js'));
router.use('/grid', require('./cim-modules/grid.js'))
router.use('/forward', require('./cim-modules/forward.js'))
//  video 工具
router.use('/video', require('./video-modules/video.js'))
module.exports = router; 