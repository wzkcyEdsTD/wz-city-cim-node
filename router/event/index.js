const express = require("express");
const router = express.Router();
const { getEventList } = require("../../oracle/oracle");

//  获取事件列表
router.get("/getEventList", async (req, res) => {
    const data = await getEventList()
    res.send({ status: 200, data })
});
//  获取社区矫正人员

module.exports = router;