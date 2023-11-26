import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";

const dbTableName = "orders";

export class OrderDao {
  addOrder(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `INSERT INTO ${dbTableName} (product_id, user_id, order_quantity, order_status, created_time) VALUES (?,?,?,?,?)`;
      dbConnection.query(
        sql,
        [
          model.getProductId(),
          model.getUserId(),
          model.getOrderQuantity(),
          model.getOrderStatus(),
          model.getCreatedTime(),
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
      dbConnection.end();
    });
  }

  getAllOrders(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName}`;
      dbConnection.query(sql, [model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }

  getOrders(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ?`;
      dbConnection.query(sql, [model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }

  getOrderById(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND product_id = ? AND user_id = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getProductId(), model.getUserId()],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
      dbConnection.end();
    });
  }

  updateOrder(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET order_status = COALESCE(?, order_status) WHERE id = ? AND product_id = ? AND user_id = ?`;
      dbConnection.query(
        sql,
        [
          model.getOrderStatus(),
          model.getId(),
          model.getProductId(),
          model.getUserId(),
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
      dbConnection.end();
    });
  }

  deleteOrder(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `DELETE FROM ${dbTableName} WHERE id = ? AND product_id = ? AND user_id = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getProductId(), model.getUserId()],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
      dbConnection.end();
    });
  }
  // getOrderByProductIdAndUserId(model) {
  //   return new Promise((resolve, reject) => {
  //     const dbConnection = mysql.createConnection(dbConfig);
  //     dbConnection.connect();
  //     const sql = `SELECT * FROM ${dbTableName} WHERE product_id = ? AND user_id = ?`;
  //     dbConnection.query(
  //       sql,
  //       [model.getProductId(), model.getUserId()],
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       });
  //       dbConnection.end();
  //   });
  // }
}
