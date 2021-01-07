const oraConfig = {
  user: "system",
  password: "admin123",
  connectString: "10.36.198.161:1521/orcl",
};
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
 * 释放链接
 */
const doRelease = () => oraConnection.close();
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

module.exports = {
  conn, doRelease, oracleExecute
};
