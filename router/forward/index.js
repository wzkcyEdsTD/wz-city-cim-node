const express = require("express");
const router = express.Router();
const { getGridMemberRoutes } = require("../../forward/jcAPI.js");

//  获取事件列表
router.post("/getGridMemberRoutes", async (req, res) => {
    const data = await getGridMemberRoutes(req.body)
    res.send({ status: 200, data })
});

module.exports = router;