const { oracleExecute } = require("./oracle");

/**
 * 获取投射视频参数
 * @param {*} params 
 */
const getVideoProjections = async (params) => {
    const { id } = params;
    return oracleExecute(
        "SELECT * FROM VIDEO_TOOL_PROJECTIONS_PARAMS WHERE ID = :id",
        [id]
    );
}
/**
 * 保存投射视频参数
 * @param {*} params 
 */
const saveVideoProjections = async (p) => {
    const { id, params } = p;
    const { rows } = await getVideoProjections({ id });
    if (rows.length) {
        return oracleExecute(
            `UPDATE VIDEO_TOOL_PROJECTIONS_PARAMS SET PARAMS = '${params}' WHERE ID = '${id}'`,
        )
    } else {
        return oracleExecute(
            "INSERT INTO VIDEO_TOOL_PROJECTIONS_PARAMS (ID,PARAMS) VALUES (:id,:params)",
            [id, params]
        )
    }
}
module.exports = {
    getVideoProjections,
    saveVideoProjections,
};