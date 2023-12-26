class createDiaryDto {
  /** @type {Datetime} */
  createdAt;
  /** @type {string} */
  user_id;
  /** @type {Int} */
  meal;
  /** @type {Int} */
  sleep;
  /** @type {Int} */
  satisfaction;
  /** @type {Datetime} */
  updatedAt;
  /** @type {Datetime} */
  deletedAt;

  constructor(data, today) {
    this.user_id = String(data?.user_id);
    this.meal = parseInt(data?.meal);
    this.sleep = parseInt(data?.sleep);
    this.satisfaction = parseInt(data?.satisfaction);
    this.createdAt = today;
    this.updatedAt = today;
    this.deletedAt = null;
  }
}

export { createDiaryDto };
