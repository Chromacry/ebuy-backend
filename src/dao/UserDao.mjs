import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";

const dbTableName = "users";

export class UserDao {
  async checkEmailExists(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE email = ?`;
      dbConnection.query(sql, [model.getEmail()], (error, results) => {
        
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      });
      dbConnection.end();
    });
  }
  async addUser(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `INSERT INTO ${dbTableName} SET ?`;
      const userData = {
        username: model.getUsername(),
        email: model.getEmail(),
        password: model.getPassword(),
        created_time: model.getCreatedTime(),
      };
      dbConnection.query(sql, userData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  async getUserByEmail(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE email = ?`;
      dbConnection.query(sql, [model.getEmail()], (error, results) => {
        
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  async updateUserToken(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET token = ? WHERE id = ?`;
      dbConnection.query(sql, [model.getToken(), model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  async getUserByIdAndToken(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND token = ?`;
      dbConnection.query(sql, [model.getId(), model.getToken()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results)
        }
      });
      dbConnection.end();
    });
  }
  async updateUserPassword(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET password = ? WHERE id = ?`;
      dbConnection.query(sql, [model.getPassword(), model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  async updateUsername(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET username = ? WHERE id = ?`;
      dbConnection.query(sql, [model.getUsername(), model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  async updateProfileImage(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET profile_image = ? WHERE id = ?`;
      dbConnection.query(sql, [model.getProfileImage(), model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  async deleteUser(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `DELETE FROM ${dbTableName} WHERE id = ? AND token = ?`;
      dbConnection.query(sql, [model.getId(), model.getToken()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  //* Added by Goh Zong Xian
  async getUserBySellerId(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `SELECT * FROM ${dbTableName} WHERE id = ? AND is_seller = 1`;
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
  async updateUserToSeller(model) {
    return new Promise((resolve, reject) => {
      const dbConnection = mysql.createConnection(dbConfig);
      dbConnection.connect();
      const sql = `UPDATE ${dbTableName} SET is_seller = ? WHERE id = ?`;
      dbConnection.query(sql, [model.getIsSeller(), model.getId()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      dbConnection.end();
    });
  }
  //* Added by Goh Zong Xian
}
