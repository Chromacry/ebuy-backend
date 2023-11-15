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
}