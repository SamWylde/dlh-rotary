import * as migration_20260225_040505_initial from './20260225_040505_initial';

export const migrations = [
  {
    up: migration_20260225_040505_initial.up,
    down: migration_20260225_040505_initial.down,
    name: '20260225_040505_initial'
  },
];
