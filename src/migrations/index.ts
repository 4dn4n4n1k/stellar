import * as migration_20261028_205141_add_r2_storage from './20261028_205141_add_r2_storage';

export const migrations = [
  {
    up: migration_20261028_205141_add_r2_storage.up,
    down: migration_20261028_205141_add_r2_storage.down,
    name: '20261028_205141_add_r2_storage'
  },
];
