import mysql from 'mysql2';
import dbConfig from '../utils/DBConfig.mjs';


const dbTableName = "reviews";

export class ReviewDao {
  // getAllProducts(model, callback) 
  // {
  //   const dbConnection = mysql.createConnection(dbConfig);
  //   dbConnection.connect();
  //   const sql = `SELECT * FROM ${dbTableName}`;
  //   dbConnection.query(sql, [model.getId()], callback);
  //   dbConnection.end();
  // }
  addReview(model,callback)
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `INSERT INTO ${dbTableName} (content, rating, user_id, product_id, created_time, review_image) VALUES (?, ?, ?, ?, ?, ?)`
    dbConnection.query(sql,[model.getContent(),model.getRating(),model.getUserId(),model.getProductId(),model.getCreatedTime(),model.getReviewImage()],callback);
    dbConnection.end();
  }
  // getReviews(model,callback){
  //   const dbConnection = mysql.createConnection(dbConfig);
  //   dbConnection.connect();
  //   const sql = `SELECT * FROM ${dbTableName} WHERE pro`
  //   dbConnection.query(sql,[model.getContent(),model.getRating(),model.getUserId(),model.getProductId(),model.getCreatedTime(),model.getReviewImage()],callback);
  //   dbConnection.end();
  // }
}