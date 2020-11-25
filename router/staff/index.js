const express = require("express");
const router = express.Router();
const { getPositiveinfosList,
    getRectificativepersonsList,
    getMentalpatientsList,
    getDruggysList,
    getSuperiorvisitsList,
    getInvolvingstabilitypeList,
} = require("../../oracle/oracle");
/**
 * 获取刑满释放人员
 */
router.get("/getPositiveinfosList", async (req, res) => {
    const data = await getPositiveinfosList();
    res.send({ status: 200, data });
});
/**
 * 获取社区矫正人员
 */
router.get("/getRectificativepersonsList", async (req, res) => {
    const data = await getRectificativepersonsList();
    res.send({ status: 200, data });
});
/**
 * 获取精神病人员
 */
router.get("/getMentalpatientsList", async (req, res) => {
    const data = await getMentalpatientsList();
    res.send({ status: 200, data });
});
/**
 * 获取吸毒人员
 */
router.get("/getDruggysList", async (req, res) => {
    const data = await getDruggysList();
    res.send({ status: 200, data });
});
/**
 * 获取重点上访人员
 */
router.get("/getSuperiorvisitsList", async (req, res) => {
    const data = await getSuperiorvisitsList();
    res.send({ status: 200, data });
});
//  获取涉稳人员信息
router.get("/getInvolvingstabilitypeList", async (req, res) => {
    const data = await getInvolvingstabilitypeList();
    res.send({ status: 200, data });
});
//  获取各类人员信息
router.get("/getAllKindsList", async (req, res) => {
    const positive = await getPositiveinfosList();
    const rectificative = await getRectificativepersonsList();
    const mental = await getMentalpatientsList();
    const drug = await getDruggysList();
    const superior = await getSuperiorvisitsList();
    const involve = await getInvolvingstabilitypeList();
    res.send({
        status: 200, data: {
            刑满释放: positive,
            社区矫正: rectificative,
            精神病人: mental,
            吸毒人员: drug,
            重点上访: superior,
            涉稳人员: involve
        }
    });
});
module.exports = router;