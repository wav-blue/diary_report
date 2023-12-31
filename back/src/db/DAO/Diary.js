import db from "..";
import { readDiaryDto } from "../DTO/readDiaryDto";

class Diary {
  static async getDiary({ user_id }) {
    const sql = `SELECT meal, sleep, satisfaction, createdAt, updatedAt FROM diary WHERE user_id= ? ;`;
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async createDiary({ newDiary }) {
    const sql = `INSERT INTO diary SET ? ;`;
    return new Promise((resolve, reject) => {
      db.query(sql, newDiary, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
export { Diary };
