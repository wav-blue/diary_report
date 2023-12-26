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
}

export { User };
