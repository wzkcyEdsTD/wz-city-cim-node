const express = require("express");
const router = express.Router();
const {
    saveVideoProjections,
    getVideoProjections
} = require("../../oracle/videoTool");
//  获取视频投射参数
router.get("/getVideoProjections", async (req, res) => {
    const data = await getVideoProjections(req.query);
    res.send({ status: 200, data });
})
//  保存视频投射参数
router.post("/saveVideoProjections", async (req, res) => {
    const data = await saveVideoProjections(req.body)
    res.send({ status: 200, data });
})
module.exports = router;