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
  getProductList(model) {
    return new Promise((resolve, reject) => {
      let queryCount;
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const countSQL = `SELECT COUNT(*) as count FROM ${dbTableName} WHERE seller_id = ?;`;
      dbConnection.query(countSQL, [model.getSellerId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          queryCount = results;
        }
      });
      const sql = `SELECT id, product_image, product_name, product_description, product_quantity,sold_quantity FROM ${dbTableName} WHERE seller_id = ? LIMIT ? OFFSET ?;`
      dbConnection.query(sql, [model.getSellerId(), model.getLimit(), model.getOffset()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ count: queryCount[0]?.count, data: results })
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
      const sql = `SELECT products.id AS product_id,products.seller_id,products.product_name,products.product_image,products.product_quantity,products.sold_quantity,
      reviews.content,reviews.rating,reviews.user_id,reviews.created_time,reviews.id AS review_id, users.username,users.profile_image 
      FROM  ${dbTableName} AS products JOIN reviews ON products.id = reviews.product_id JOIN users ON reviews.user_id = users.id
      WHERE products.id = ?;`
      

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

  getProductByIdAndSellerId(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ? and seller_id = ?`;
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
