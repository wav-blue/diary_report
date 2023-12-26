import bcrypt from "bcrypt";
import { ulid } from "ulidx";

async function createRandomId() {
  return ulid();
}
async function bcryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

export { createRandomId, bcryptPassword };
