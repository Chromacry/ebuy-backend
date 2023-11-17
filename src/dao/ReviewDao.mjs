import mysql from 'mysql2';
import dbConfig from '../utils/DBConfig.mjs';


const dbTableName = "reviews";

export class ReviewDao {
  addReview(model,callback)
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `INSERT INTO ${dbTableName} (content, rating, user_id, product_id, created_time, review_image) VALUES (?, ?, ?, ?, ?, ?)`;
    dbConnection.query(sql,[model.getContent(),model.getRating(),model.getUserId(),model.getProductId(),model.getCreatedTime(),model.getReviewImage()],callback);
    dbConnection.end();
  }
  
  updateReview(model,callback)
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `UPDATE ${dbTableName} SET content = ?, rating = ?, review_image = ? WHERE id = ? `;
    dbConnection.query(sql,[model.getContent(), model.getRating(), model.getReviewImage(),model.getId()],callback);
    dbConnection.end();
  }
  
  getProductReviews(model,callback){
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `SELECT * FROM ${dbTableName} WHERE product_id = ?`
    dbConnection.query(sql,[model.getProductId()],callback);
    dbConnection.end();
  }
  
}