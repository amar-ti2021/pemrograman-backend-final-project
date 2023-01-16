const db = require("./Database");

class Model {
  static table;

  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM " + this.table;
      db.query(query, (error, results) => {
        if (results.length > 0) {
          resolve(results);
        } else {
          resolve(null);
        }
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM " + this.table + " WHERE id = ?";

      db.query(query, id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  static where(field, value) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${this.table} WHERE ${field} Like '%${value}%'`;

      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${this.table} SET ?`;
      db.query(query, data, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  static edit(id, data) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE ${this.table} SET ? WHERE id = ?`;
      db.query(query, [data, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM ${this.table} WHERE id = ?`;
      db.query(query, id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
module.exports = Model;
