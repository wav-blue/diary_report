import { ulid } from 'ulidx';

function createRandomId(): string {
  return ulid();
}

export { createRandomId };
