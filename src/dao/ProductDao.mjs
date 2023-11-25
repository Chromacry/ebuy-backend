import mysql from 'mysql2';
import dbConfig from '../utils/DBConfig.mjs';

const dbTableName = "products";

export class ProductDao {
  getAllProducts(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `SELECT * FROM ${dbTableName}`;
    dbConnection.query(sql, [model.getId()], callback);
    dbConnection.end();
  }

  addProduct(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `INSERT INTO ${dbTableName} (seller_id, product_name, product_description, product_image, product_quantity, created_time) VALUES (?,?,?,?,?,?)`;
    dbConnection.query(sql, [model.getSellerId(), model.getProductName(), model.getProductDescription(), model.getProductImage(), model.getProductQuantity(),  model.getCreatedTime()], callback);
    dbConnection.end();
  }

  getProductByProductNameAndSellerId(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `SELECT * FROM ${dbTableName} WHERE seller_id = ? AND product_name = ?`;
    dbConnection.query(sql, [model.getSellerId(), model.getProductName()], callback);
    dbConnection.end();
  }

  getProductById(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND seller_id = ?`;
    dbConnection.query(sql, [model.getId(), model.getSellerId()], callback);
    dbConnection.end();
  }

  updateProduct(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `UPDATE ${dbTableName} SET product_name = COALESCE(?, product_name), product_description = COALESCE(?, product_description), product_image = COALESCE(?, product_image) WHERE id = ? AND seller_id = ? `;
    dbConnection.query(sql, [model.getProductName(), model.getProductDescription(), model.getProductImage(), model.getId(), model.getSellerId()], callback);
    dbConnection.end();
  }
}