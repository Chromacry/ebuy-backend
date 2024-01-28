import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";

const dbTableName = "reviews";

export class ReviewDao {
  addReview(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `INSERT INTO ${dbTableName} (content, rating, user_id, product_id, created_time, review_image) VALUES (?, ?, ?, ?, ?, ?)`;
      dbConnection.query(
        sql,
        [
          model.getContent(),
          model.getRating(),
          model.getUserId(),
          model.getProductId(),
          model.getCreatedTime(),
          model.getReviewImage(),
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

  updateReview(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET content = ?, rating = ?, review_image = ? WHERE id = ? `;
      dbConnection.query(
        sql,
        [
          model.getContent(),
          model.getRating(),
          model.getReviewImage(),
          model.getId(),
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

  getProductReviews(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT reviews.*, users.username,users.profile_image
      FROM ${dbTableName} AS reviews
      JOIN users ON reviews.user_id = users.id
      WHERE reviews.product_id = ?;`;
      dbConnection.query(sql, [model.getProductId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }

  deleteReview(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `DELETE FROM ${dbTableName} WHERE id = ?`;
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
  getReviewByReviewId(model){
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `
      SELECT reviews.*, products.product_name,products.product_image
      FROM ${dbTableName} AS reviews
      JOIN products ON reviews.product_id = products.id
      WHERE reviews.id = ?
    `;
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
}
