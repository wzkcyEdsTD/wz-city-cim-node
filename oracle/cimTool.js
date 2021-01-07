const { oracleExecute } = require("./oracle");

/**
 * 获取事件列表
 * @param {*} userid
 * @param {*} fn
 */
const getEventList = async (params) => {
    return oracleExecute(
        "SELECT DISTINCT * FROM (SELECT * FROM ISSUES_TEMP WHERE OCCURDATE BETWEEN to_date('2020-12-01 00:00:00','yyyy-MM-dd HH24:MI:SS') AND to_date('2020-12-31 23:59:59','yyyy-MM-dd HH24:MI:SS')) I left join (SELECT * FROM (SELECT ISSUEID,PHOTOURL , row_number() over (partition BY ISSUEID ORDER BY PHOTOURL )d FROM ISSUE_PHOTO_TEMP ) WHERE d = 1) IP on I.ID = IP.ISSUEID ORDER BY I.OCCURDATE DESC",
    );
};
const getEventLog = async (params) => {
    const { id } = params;
    return oracleExecute(
        "SELECT DISTINCT DEALUSERNAME,DEALDESCRIPTION,DEALTIME FROM ISSUELOG_TEMP WHERE ISSUEID = :id ORDER BY DEALTIME ASC",
        [id]
    );
}
/**
 * 获取刑满释放人员
 * @param {*} params 
 * @param {*} fn 
 */
const getPositiveinfosList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME,RELEASEORBACKDATE FROM POSITIVEINFOS_TEMP ORDER BY RELEASEORBACKDATE DESC",
    );
};
/**
 * 获取社区矫正人员
 * @param {*} params 
 * @param {*} fn 
 */
const getRectificativepersonsList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM RECTIFICATIVEPERSONS_TEMP ORDER BY ORGID ASC",
    );
};
/**
 * 获取精神病人员
 * @param {*} params 
 * @param {*} fn 
 */
const getMentalpatientsList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT ORGID,NATIVEPOLICESTATION,NATIVEPLACEADDRESS,NAME FROM MENTALPATIENTS_TEMP ORDER BY ORGID ASC",
    );
};
/**
 * 获取吸毒人员
 * @param {*} params 
 * @param {*} fn 
 */
const getDruggysList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM DRUGGYS_TEMP ORDER BY ORGID ASC",
    );
};
/**
 * 获取重点上访人员
 * @param {*} params 
 * @param {*} fn 
 */
const getSuperiorvisitsList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM SUPERIORVISITS_TEMP ORDER BY ORGID ASC",
    );
};
/**
 * 获取涉稳人员信息
 * @param {*} params 
 * @param {*} fn 
 */
const getInvolvingstabilitypeList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM INVOLVINGSTABILITYPS_TEMP ORDER BY ORGID ASC",
    );
};
/**
 * 获取网格员列表
 * @param {*} params 
 * @param {*} fn 
 */
const getGridMemberList = (params) => {
    return oracleExecute(
        "SELECT DISTINCT * FROM GRIDMEMBER",
    );
};
/**
 * 通过网格获取网格员
 * @param {*} params 
 */
const getGridManagerByGrid = (params) => {
    const { grid } = params;
    return oracleExecute(
        "SELECT DISTINCT * FROM GRIDMANAGER WHERE GRID = :grid ",
        [grid]
    );
}

/**
 * 获取网格员路径信息
 * @param {*} param 
 */
const getGridMemberRouteLink = (params) => {
    const { name } = params;
    return oracleExecute(
        "SELECT DISTINCT * FROM GRIDMEMBERTRACKRECORD WHERE NAME = :name ORDER BY STARTTIME DESC",
        [name]
    );
}
module.exports = {
    getEventList,
    getEventLog,
    getPositiveinfosList,
    getRectificativepersonsList,
    getMentalpatientsList,
    getDruggysList,
    getSuperiorvisitsList,
    getInvolvingstabilitypeList,
    getGridMemberList,
    getGridManagerByGrid,
    getGridMemberRouteLink
};