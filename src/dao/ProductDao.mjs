import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";

const dbTableName = "products";

export class ProductDao {
  getAllProducts(model) {
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

  addProduct(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `INSERT INTO ${dbTableName} (seller_id, product_name, product_description, product_image, product_quantity, created_time) VALUES (?,?,?,?,?,?)`;
      dbConnection.query(
        sql,
        [
          model.getSellerId(),
          model.getProductName(),
          model.getProductDescription(),
          model.getProductImage(),
          model.getProductQuantity(),
          model.getCreatedTime(),
        ],
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

  getProductByProductNameAndSellerId(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE seller_id = ? AND product_name = ?`;
      dbConnection.query(
        sql,
        [model.getSellerId(), model.getProductName()],
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

  getProductById(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND seller_id = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getSellerId()],
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

  deleteProduct(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `DELETE FROM ${dbTableName} WHERE id = ? AND seller_id = ?`;
      dbConnection.query(
        sql,
        [model.getId(), model.getSellerId()],
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

  updateProduct(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET product_name = COALESCE(?, product_name), product_description = COALESCE(?, product_description), product_image = COALESCE(?, product_image) WHERE id = ? AND seller_id = ? `;
      dbConnection.query(
        sql,
        [
          model.getProductName(),
          model.getProductDescription(),
          model.getProductImage(),
          model.getId(),
          model.getSellerId(),
        ],
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
