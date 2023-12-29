import { parseDate } from "../../utils/dateFunction";

class readDiaryDto {
  /** @type {Datetime} */
  createdAt;
  /** @type {Int} */
  meal;
  /** @type {Int} */
  sleep;
  /** @type {Int} */
  satisfaction;
  /** @type {Datetime} */
  updatedAt;

  constructor(data, today) {
    this.meal = String(data?.meal);
    this.sleep = String(data?.sleep);
    this.satisfaction = String(data?.satisfaction);
    this.createdAt = parseDate(data?.createdAt);
    this.updatedAt = parseDate(data?.updatedAt);
  }
}

export { readDiaryDto };
