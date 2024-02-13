import { ulid } from 'ulidx';
import * as bcrypt from 'bcrypt';
4;
function createRandomId(): string {
  return ulid();
}
async function bcryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export { createRandomId, bcryptPassword };
