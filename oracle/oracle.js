const { oraConfig } = require("./config");
const oracledb = require("oracledb");
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
 * 获取角色批注列表
 * @param {*} userid
 * @param {*} fn
 */
const fetchLabelList = (data, fn) => {
  const { userid, info, type, prod, stime, etime } = data;
  const SQLPARAMS = [userid];
  let SQLSTRING = "";
  info && (SQLSTRING += ` and INFO like '%${info}%'`);
  type && (SQLSTRING += ` and TYPE like '%${type}%'`);
  prod && SQLPARAMS.push(prod) && (SQLSTRING += ` and prod = :prod`);
  stime &&
    etime &&
    (SQLSTRING += ` and UPDATEDATE between to_date('${stime} 00:00:00','yyyy-mm-dd hh24:mi:ss') and to_date('${etime} 23:59:59','yyyy-mm-dd hh24:mi:ss')`);
  oraConnection.execute(
    `SELECT * FROM NODELABEL WHERE USERID = :userid ${SQLSTRING} ORDER BY UPDATEDATE DESC`,
    SQLPARAMS,
    { autoCommit: true },
    (err, result) => {
      if (err) {
        console.error(err.message);
        return;
      }
      fn && fn(result);
    }
  );
};
/**
 * 删除指定批注
 * @param {*} id
 * @param {*} fn
 */
const deleteLabelList = (id, fn) => {
  oraConnection.execute(
    `DELETE FROM NODELABEL WHERE ID = :id`,
    [id],
    { autoCommit: true },
    (err, result) => {
      if (err) {
        console.error(err.message);
        return;
      }
      fn && fn(result);
    }
  );
};
/**
 * 插入批注
 * @param {*} sql
 * @param {*} obj
 * @param {*} fn
 */
const oracleInsert = (sql, obj, fn) => {
  oraConnection.execute(sql, obj, { autoCommit: true }, (err, result) => {
    if (err) {
      console.error(err.message);
      return;
    }
    fn && fn(result);
  });
};
/**
 * 更新批注
 * @param {*} sql
 * @param {*} obj
 * @param {*} fn
 */
const oracleUpdate = (sql, obj, fn) => {
  oraConnection.execute(sql, obj, { autoCommit: true }, (err, result) => {
    if (err) {
      console.error(err.message);
      return;
    }
    fn && fn(result);
  });
};
/**
 * 释放链接
 */
const doRelease = () => oraConnection.close();
module.exports = {
  conn,
  fetchLabelList,
  oracleInsert,
  oracleUpdate,
  deleteLabelList,
};
