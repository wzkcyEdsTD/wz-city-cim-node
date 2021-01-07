const express = require("express");
const router = express.Router();
const { getEventList, getEventLog } = require("../../oracle/cimTool");

//  获取事件列表
router.get("/getEventList", async (req, res) => {
    const data = await getEventList()
    res.send({ status: 200, data })
});
//  获取事件信息
router.get("/getEventLog", async (req, res) => {
    const data = await getEventLog(req.query);
    res.send({ status: 200, data });
})

module.exports = router;