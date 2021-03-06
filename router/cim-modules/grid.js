const express = require("express");
const router = express.Router();
const {
    getGridMemberList,
    getGridMemberRouteLink,
    getGridManagerByGrid
} = require("../../oracle/cimTool");
//  获取网格员列表
router.get("/getGridMemberList", async (req, res) => {
    const data = await getGridMemberList();
    res.send({ status: 200, data });
})
//  获取网格员行动轨迹
router.get("/getGridMemberRouteLink", async (req, res) => {
    const data = await getGridMemberRouteLink(req.query)
    res.send({ status: 200, data });
})
router.get("/getGridManagerByGrid", async (req, res) => {
    const data = await getGridManagerByGrid(req.query)
    res.send({ status: 200, data });
})
module.exports = router;