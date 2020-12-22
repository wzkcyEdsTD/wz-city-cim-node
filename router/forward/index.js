const express = require("express");
const router = express.Router();
const { getGridMemberRoutes } = require("../../forward/jcAPI.js");
const { getExtraVideoLogin, getExtraVideo } = require("../../forward/videoAPI.js");

//  获取事件列表
router.post("/getGridMemberRoutes", async (req, res) => {
    const data = await getGridMemberRoutes(req.body)
    res.send({ status: 200, data })
});

//  获取应急视频
router.post("/getExtraVideo", async (req, res) => {
    const { data } = await getExtraVideoLogin()
    const { uid, token } = data.data;
    const obj = await getExtraVideo({ ...req.body, uid, token })
    res.send({ status: 200, data: { ...obj.data.data, flv: obj.data.data.Flv } })
});

module.exports = router;