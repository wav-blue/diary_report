import db from "..";

class User {
  static async createUser({ newUser }) {
    const sql = `INSERT INTO user SET ?; `;
    return new Promise((resolve, reject) => {
      db.query(sql, newUser, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async findUserByEmail({ email }) {
    const query = `SELECT user_id, user_name, email, password FROM user WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, email, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export { User };
