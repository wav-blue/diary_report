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
  activity;
  /** @type {Int} */
  satisfaction;
  /** @type {VARCHAR(100)} */
  comment;
  /** @type {Datetime} */
  updatedAt;
  /** @type {Datetime} */
  deletedAt;

  constructor(data, today) {
    this.user_id = String(data?.user_id);
    this.meal = parseInt(data?.meal);
    this.sleep = parseInt(data?.sleep);
    this.activity = parseInt(data?.activity);
    this.satisfaction = parseInt(data?.satisfaction);
    this.comment = String(data?.comment);
    if (!this.comment) this.comment = "";
    this.createdAt = today;
    this.updatedAt = today;
    this.deletedAt = null;
  }
}

export { createDiaryDto };
