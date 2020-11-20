const { oraConfig } = require("./config");
const oracledb = require("oracledb");
const option = { resultSet: false, outFormat: oracledb.OBJECT };
//  oracle
let oraConnection;
const conn = (fn) => {
  oracledb.getConnection(oraConfig, (err, connection) => {
    if (err) {
      console.log("Fail to connect oracle:", err);
      return;
    }
    oraConnection = connection;
    fn && fn();
  });
};
/**
 * 通用执行函数
 * @param {*} SQL 
 * @param {*} fn 
 */
const oracleExecute = (SQL, data = []) => {
  return new Promise((resolve, reject) => {
    oraConnection.execute(
      SQL,
      data,
      option,
      (err, result) => {
        err ? reject(err.message) : resolve(result)
      }
    );
  })

}
/**
 * 获取事件列表
 * @param {*} userid
 * @param {*} fn
 */
const getEventList = async (params) => {
  return oracleExecute(
    "SELECT DISTINCT ID,OCCURORG,SUBJECT,LASTUSERNAME,LAT,LON,OCCURDATE,ISSUECONTENT FROM ISSUES_TEMP ORDER BY OCCURDATE DESC",
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
 * 释放链接
 */
const doRelease = () => oraConnection.close();
module.exports = {
  conn, doRelease,
  getEventList,
  getEventLog,
  getPositiveinfosList,
  getRectificativepersonsList,
  getMentalpatientsList,
  getDruggysList,
  getSuperiorvisitsList,
  getInvolvingstabilitypeList
};
