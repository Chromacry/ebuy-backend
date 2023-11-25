import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";

const dbTableName = "users";

export class UserDao {
  getUserById(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT username, email, profile_image, id, created_time FROM ${dbTableName} WHERE id = ?`;
      dbConnection.query(
        sql,
        [model.getId()],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        dbConnection.end();
    });
  }
  getUserBySellerId(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT username, email, profile_image, id, created_time FROM ${dbTableName} WHERE id = ? AND is_seller = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getIsSeller()],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
        dbConnection.end();
    });
  }
}
