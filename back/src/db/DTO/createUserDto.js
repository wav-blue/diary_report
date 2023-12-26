/** 유저 생성 */

import { bcryptPassword } from "../../utils/loginUtils";

class createUserDto {
  /** @type {string} */
  user_id;
  /** @type {string} */
  password;
  /** @type {string} */
  email;
  /** @type {string} */
  user_name;

  /** @type {Date} */
  createdAt;
  /** @type {Date} */
  updatedAt;
  /** @type {Date} */
  deletedAt;

  constructor(data, today) {
    this.user_id = String(data?.user_id);
    this.email = String(data?.email);
    this.password = String(data?.password);
    this.user_name = String(data?.user_name);
    this.createdAt = today;
    this.updatedAt = today;
    this.deletedAt = null;
  }
  async passwordEncrypt() {
    this.password = await bcryptPassword(this.password, 10);
  }
}

export { createUserDto };
