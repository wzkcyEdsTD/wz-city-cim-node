const { oraConfig } = require("./config");
const oracledb = require("oracledb");
const option = { resultSet: false, outFormat: oracledb.OBJECT };
//  oracle
let oraConnection;
const conn = () => {
  oracledb.getConnection(oraConfig, (err, connection) => {
    if (err) {
      console.log("Fail to connect oracle:", err);
      return;
    }
    oraConnection = connection;
  });
};
/**
 * 通用执行函数
 * @param {*} SQL 
 * @param {*} fn 
 */
const oracleExecute = (SQL) => {
  return new Promise((resolve, reject) => {
    oraConnection.execute(
      SQL,
      [],
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
const getEventList = async (data) => {
  return oracleExecute(
    "SELECT OCCURORG,SUBJECT,LASTUSERNAME,LAT,LON,OCCURDATE FROM ISSUES_TEMP ORDER BY OCCURDATE DESC",
  );
};
/**
 * 获取刑满释放人员
 * @param {*} data 
 * @param {*} fn 
 */
const getPositiveinfosList = (data) => {
  return oracleExecute(
    "SELECT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME,RELEASEORBACKDATE FROM POSITIVEINFOS_TEMP ORDER BY RELEASEORBACKDATE DESC",
  );
};
/**
 * 获取社区矫正人员
 * @param {*} data 
 * @param {*} fn 
 */
const getRectificativepersonsList = (data) => {
  return oracleExecute(
    "SELECT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM RECTIFICATIVEPERSONS_TEMP ORDER BY ORGID ASC",
  );
};
/**
 * 获取精神病人员
 * @param {*} data 
 * @param {*} fn 
 */
const getMentalpatientsList = (data) => {
  return oracleExecute(
    "SELECT ORGID,NATIVEPOLICESTATION,NATIVEPLACEADDRESS,NAME FROM MENTALPATIENTS_TEMP ORDER BY ORGID ASC",
  );
};
/**
 * 获取吸毒人员
 * @param {*} data 
 * @param {*} fn 
 */
const getDruggysList = (data) => {
  return oracleExecute(
    "SELECT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM DRUGGYS_TEMP ORDER BY ORGID ASC",
  );
};
/**
 * 获取重点上访人员
 * @param {*} data 
 * @param {*} fn 
 */
const getSuperiorvisitsList = (data) => {
  return oracleExecute(
    "SELECT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM SUPERIORVISITS_TEMP ORDER BY ORGID ASC",
  );
};
/**
 * 获取涉稳人员信息
 * @param {*} data 
 * @param {*} fn 
 */
const getInvolvingstabilitypeList = (data) => {
  return oracleExecute(
    "SELECT ORGID,NATIVEPOLICESTATION,CURRENTADDRESS,NAME FROM INVOLVINGSTABILITYPS_TEMP ORDER BY ORGID ASC",
  );
};
/**
 * 释放链接
 */
const doRelease = () => oraConnection.close();
module.exports = {
  conn, doRelease,
  getEventList,
  getPositiveinfosList,
  getRectificativepersonsList,
  getMentalpatientsList,
  getDruggysList,
  getSuperiorvisitsList,
  getInvolvingstabilitypeList
};
