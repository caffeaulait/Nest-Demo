import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', ':memory'));
  } catch (err) {
    console.log(`test clean up error: ${err}`);
  }
});

global.afterEach(async () => {});
