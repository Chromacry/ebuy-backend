import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";

const dbTableName = "orders";
const dbTableName2 = "products";

export class OrderDao {
  addOrder(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `INSERT INTO ${dbTableName} (product_id, user_id, order_quantity, order_status, created_time,tracking_number,product_price) VALUES (?,?,?,?,?,?,?)`;
      dbConnection.query(
        sql,
        [
          model.getProductId(),
          model.getUserId(),
          model.getOrderQuantity(),
          model.getOrderStatus(),
          model.getCreatedTime(),
          model.getTrackingNumber(),
          model.getProductPrice(),
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
      const sql = `SELECT orders.product_id,orders.order_quantity,orders.order_status,orders.created_time,orders.tracking_number,users.username FROM ${dbTableName} JOIN users ON orders.user_id = users.id;`;
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

  getOrderList(model) {
    return new Promise((resolve, reject) => {
      let queryCount;
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const countSQL = `SELECT COUNT(*) as count FROM  ${dbTableName} JOIN  ${dbTableName2} ON orders.product_id = products.id WHERE products.seller_id = ?;`;
      dbConnection.query(countSQL, [model.getUserId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          queryCount = results;
        }
      });
      const sql = `SELECT orders.id, orders.order_quantity, orders.order_status, orders.created_time, orders.tracking_number, orders.product_price, users.username
      FROM ${dbTableName}
      INNER JOIN ${dbTableName2} ON orders.product_id = products.id
      JOIN users ON orders.user_id = users.id
      WHERE products.seller_id = ?
      LIMIT ? OFFSET ?;`;

      dbConnection.query(
        sql,
        [model.getUserId(), model.getLimit(), model.getOffset()],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({ count: queryCount[0]?.count, data: results });
          }
        }
      );
      dbConnection.end();
    });
  }

  // getOrdersBySellerId(model) {
  //   return new Promise((resolve, reject) => {
  //     const dbConnection = mysql.createConnection(dbConfig);
  //     dbConnection.connect();

  //     // Step 1: Get seller_id from the "products" table
  //     const getSellerIdQuery = `SELECT seller_id FROM products WHERE product_id = ?`;
  //     dbConnection.query(getSellerIdQuery, [model.getId()], (sellerIdError, sellerIdResults) => {
  //       if (sellerIdError) {
  //         dbConnection.end();
  //         reject(sellerIdError);
  //       } else {
  //         // Check if a seller_id was found
  //         if (sellerIdResults.length === 0) {
  //           dbConnection.end();
  //           reject(new Error('Seller ID not found for the given product ID'));
  //         } else {
  //           const sellerId = sellerIdResults[0].seller_id;

  //           // Step 2: Get orders details based on the seller_id (user_id in "order" table)
  //           const getOrdersQuery = 'SELECT * FROM orders WHERE user_id = ?';
  //           dbConnection.query(getOrdersQuery, [sellerId], (ordersError, ordersResults) => {
  //             dbConnection.end();
  //             if (ordersError) {
  //               reject(ordersError);
  //             } else {
  //               resolve(ordersResults);
  //             }
  //           });
  //         }
  //       }
  //     });
  //   });
  // }

  getOrdersBySellerId(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT orders.product_id,orders.order_quantity,orders.order_status,orders.created_time,orders.tracking_number,users.username FROM ${dbTableName} JOIN users ON orders.user_id = users.id;`;
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
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND user_id = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getUserId()],
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
      const sql = `UPDATE ${dbTableName} SET order_status = ? WHERE id = ? AND user_id = ?`;
      dbConnection.query(
        sql,
        [
          model.getOrderStatus(),
          model.getId(),
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
      const sql = `DELETE FROM ${dbTableName} WHERE id = ? AND user_id = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getUserId()],
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
