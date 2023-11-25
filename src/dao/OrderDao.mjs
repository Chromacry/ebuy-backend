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
}