import mysql from 'mysql2';
import dbConfig from '../utils/DBConfig.mjs';

const dbTableName = "orders";

export class OrderDao {

  addOrder(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `INSERT INTO ${dbTableName} (product_id, user_id, order_quantity, order_status, created_time) VALUES (?,?,?,?,?)`;
    dbConnection.query(sql, [model.getProductId(), model.getUserId(), model.getOrderQuantity(), model.getOrderStatus(), model.getCreatedTime()], callback);
    dbConnection.end();
  }

  getAllOrders(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `SELECT * FROM ${dbTableName}`;
    dbConnection.query(sql, [model.getId()], callback);
    dbConnection.end();
  }

  getOrderById(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND product_id = ? AND user_id = ?`;
    dbConnection.query(sql, [model.getId(), model.getProductId(), model.getUserId()], callback);
    dbConnection.end();
  }

  
  updateOrder(model, callback) 
  {
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    const sql = `UPDATE ${dbTableName} SET order_status = COALESCE(?, order_status) WHERE id = ? AND product_id = ? AND user_id = ?`;
    dbConnection.query(sql, [model.getOrderStatus(), model.getId(), model.getProductId(), model.getUserId()], callback);
    dbConnection.end();
  }
}