import db from "..";
import { readDiaryDto } from "../DTO/readDiaryDto";

class Diary {
  static async getDiary({ user_id }) {
    const sql = `SELECT createdAt, updatedAt, meal, sleep, activity, satisfaction, comment FROM diary WHERE user_id= ? ;`;
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
  static async getDiaryToday({ user_id }) {
    const sql = `SELECT createdAt, updatedAt, meal, sleep, activity, satisfaction, comment FROM diaryreport.diary WHERE DATE_FORMAT(createdAt, "%Y-%m-%d") = CURDATE() AND user_id= ? ;`;
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
