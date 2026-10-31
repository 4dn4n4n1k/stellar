import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STAGING_PROJECT_REF,
  PRODUCTION_PROJECT_REF,
  REQUIRED_CMS_TABLES,
  validateEnvironment,
  validateDatabaseTarget,
  verifyMigrationRegistry,
  verifyPostMigrationSchema,
  runStagingMigration,
} from '../scripts/run-staging-migration.mjs';

test('1. Environment Validation - Success with valid staging preview env', () => {
  const validEnv = {
    VERCEL: '1',
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'staging',
    RUN_STAGING_MIGRATION: 'true',
  };
  assert.equal(validateEnvironment(validEnv), true);
});

test('2. Environment Validation - Rejects missing VERCEL flag', () => {
  const env = {
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'staging',
    RUN_STAGING_MIGRATION: 'true',
  };
  assert.throws(() => validateEnvironment(env), /VERCEL !== "1"/);
});

test('3. Environment Validation - Rejects production environment', () => {
  const env = {
    VERCEL: '1',
    VERCEL_ENV: 'production',
    VERCEL_GIT_COMMIT_REF: 'staging',
    RUN_STAGING_MIGRATION: 'true',
  };
  assert.throws(() => validateEnvironment(env), /VERCEL_ENV !== "preview"/);
});

test('4. Environment Validation - Rejects wrong git branch (main)', () => {
  const env = {
    VERCEL: '1',
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'main',
    RUN_STAGING_MIGRATION: 'true',
  };
  assert.throws(() => validateEnvironment(env), /VERCEL_GIT_COMMIT_REF !== "staging"/);
});

test('5. Environment Validation - Rejects feature branch', () => {
  const env = {
    VERCEL: '1',
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'feature/auth-updates',
    RUN_STAGING_MIGRATION: 'true',
  };
  assert.throws(() => validateEnvironment(env), /VERCEL_GIT_COMMIT_REF !== "staging"/);
});

test('6. Environment Validation - Rejects missing migration trigger flag', () => {
  const env = {
    VERCEL: '1',
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'staging',
  };
  assert.throws(() => validateEnvironment(env), /RUN_STAGING_MIGRATION !== "true"/);
});

test('7. Environment Validation - Rejects false migration trigger flag', () => {
  const env = {
    VERCEL: '1',
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'staging',
    RUN_STAGING_MIGRATION: 'false',
  };
  assert.throws(() => validateEnvironment(env), /RUN_STAGING_MIGRATION !== "true"/);
});

test('8. Database Target Validation - Rejects missing DATABASE_URI', () => {
  assert.throws(() => validateDatabaseTarget(undefined), /DATABASE_URI is missing or empty/);
  assert.throws(() => validateDatabaseTarget(''), /DATABASE_URI is missing or empty/);
});

test('9. Database Target Validation - Rejects malformed DATABASE_URI', () => {
  assert.throws(() => validateDatabaseTarget('not-a-url'), /cannot be parsed as a URL/);
});

test('10. Database Target Validation - Rejects invalid protocol (http, mysql)', () => {
  const httpUri = `http://db.${STAGING_PROJECT_REF}.supabase.co:5432/postgres`;
  assert.throws(() => validateDatabaseTarget(httpUri), /Invalid database protocol "http:"/);

  const mysqlUri = `mysql://postgres:secret@db.${STAGING_PROJECT_REF}.supabase.co:5432/postgres`;
  assert.throws(() => validateDatabaseTarget(mysqlUri), /Invalid database protocol "mysql:"/);
});

test('11. Database Target Validation - Explicitly rejects production project reference (pooler)', () => {
  const prodPoolerUri = `postgres://postgres.${PRODUCTION_PROJECT_REF}:secretpassword@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres`;
  assert.throws(() => validateDatabaseTarget(prodPoolerUri), /targets PRODUCTION Supabase \(nilktzjurqolrztpefwv\)/);
});

test('12. Database Target Validation - Explicitly rejects production project reference (direct)', () => {
  const prodDirectUri = `postgres://postgres:secretpassword@db.${PRODUCTION_PROJECT_REF}.supabase.co:5432/postgres`;
  assert.throws(() => validateDatabaseTarget(prodDirectUri), /targets PRODUCTION Supabase \(nilktzjurqolrztpefwv\)/);
});

test('13. Database Target Validation - Explicitly rejects production region (ap-northeast-1)', () => {
  const prodRegionUri = `postgres://postgres.${STAGING_PROJECT_REF}:secret@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres`;
  assert.throws(() => validateDatabaseTarget(prodRegionUri), /targets PRODUCTION Supabase \(nilktzjurqolrztpefwv\)/);
});

test('14. Database Target Validation - Rejects unknown host', () => {
  const unknownUri = `postgres://postgres:secret@db.externalhost.com:5432/postgres`;
  assert.throws(() => validateDatabaseTarget(unknownUri), /Unrecognized database host/);
});

test('15. Database Target Validation - Rejects wrong pooler region (us-east-1)', () => {
  const wrongRegionUri = `postgres://postgres.${STAGING_PROJECT_REF}:secret@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
  assert.throws(() => validateDatabaseTarget(wrongRegionUri), /Pooler region mismatch: "us-east-1". Expected "eu-west-2"/);
});

test('16. Database Target Validation - Rejects wrong pooler port (5432 or 6544)', () => {
  const wrongPortUri = `postgres://postgres.${STAGING_PROJECT_REF}:secret@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`;
  assert.throws(() => validateDatabaseTarget(wrongPortUri), /Pooler port mismatch: "5432". Expected "6543"/);
});

test('17. Database Target Validation - Rejects pooler username with another user (anotheruser.rdqnljiefyudowbonjcb)', () => {
  const anotherUserUri = `postgres://anotheruser.${STAGING_PROJECT_REF}:secret@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`;
  assert.throws(
    () => validateDatabaseTarget(anotherUserUri),
    /Pooler username "anotheruser\.rdqnljiefyudowbonjcb" is invalid\. Must match exactly "postgres\.rdqnljiefyudowbonjcb"/
  );
});

test('18. Database Target Validation - Rejects pooler username without project ref (bare postgres)', () => {
  const bareUserUri = `postgres://postgres:secret@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`;
  assert.throws(() => validateDatabaseTarget(bareUserUri), /Pooler username "postgres" is invalid/);
});

test('19. Database Target Validation - Rejects pooler username with wrong project ref', () => {
  const wrongRefUri = `postgres://postgres.abcdefghijklmnop:secret@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`;
  assert.throws(() => validateDatabaseTarget(wrongRefUri), /Pooler username "postgres\.abcdefghijklmnop" is invalid/);
});

test('20. Database Target Validation - Rejects direct connection wrong port (5433)', () => {
  const wrongPortDirect = `postgres://postgres:secretpassword@db.${STAGING_PROJECT_REF}.supabase.co:5433/postgres`;
  assert.throws(() => validateDatabaseTarget(wrongPortDirect), /Direct connection port mismatch: "5433". Expected "5432"/);
});

test('21. Database Target Validation - Rejects direct connection wrong username (admin)', () => {
  const wrongUserDirect = `postgres://admin:secretpassword@db.${STAGING_PROJECT_REF}.supabase.co:5432/postgres`;
  assert.throws(() => validateDatabaseTarget(wrongUserDirect), /Direct connection username mismatch: "admin". Expected "postgres"/);
});

test('22. Database Target Validation - Accepts correct staging direct connection', () => {
  const directUri = `postgres://postgres:secretpassword@db.${STAGING_PROJECT_REF}.supabase.co:5432/postgres`;
  const result = validateDatabaseTarget(directUri);
  assert.equal(result.mode, 'direct');
  assert.equal(result.host, `db.${STAGING_PROJECT_REF}.supabase.co`);
  assert.equal(result.port, 5432);
  assert.equal(result.user, 'postgres');
  assert.equal(result.project, STAGING_PROJECT_REF);
  assert.equal(result.database, 'postgres');
});

test('23. Database Target Validation - Accepts staging direct connection with postgresql protocol and default port', () => {
  const directUri = `postgresql://postgres:secretpassword@db.${STAGING_PROJECT_REF}.supabase.co/postgres`;
  const result = validateDatabaseTarget(directUri);
  assert.equal(result.mode, 'direct');
  assert.equal(result.host, `db.${STAGING_PROJECT_REF}.supabase.co`);
  assert.equal(result.port, 5432);
  assert.equal(result.user, 'postgres');
});

test('24. Database Target Validation - Accepts correct staging pooler connection', () => {
  const poolerUri = `postgres://postgres.${STAGING_PROJECT_REF}:supersecrettoken@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`;
  const result = validateDatabaseTarget(poolerUri);
  assert.equal(result.mode, 'pooler');
  assert.equal(result.host, 'aws-0-eu-west-2.pooler.supabase.com');
  assert.equal(result.port, 6543);
  assert.equal(result.region, 'eu-west-2');
  assert.equal(result.user, `postgres.${STAGING_PROJECT_REF}`);
  assert.equal(result.project, STAGING_PROJECT_REF);
});

test('25. Database Target Validation - Accepts staging pooler connection with postgresql protocol', () => {
  const poolerUri = `postgresql://postgres.${STAGING_PROJECT_REF}:supersecrettoken@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`;
  const result = validateDatabaseTarget(poolerUri);
  assert.equal(result.mode, 'pooler');
  assert.equal(result.user, `postgres.${STAGING_PROJECT_REF}`);
});

test('26. Migration Registry Verification - Accepts exact registered sequence', () => {
  const validMigrations = [
    { name: '20261031_180935_initial_schema_from_empty', up: async () => {}, down: async () => {} },
    { name: '20261028_205141_add_r2_storage', up: async () => {}, down: async () => {} },
  ];
  assert.equal(verifyMigrationRegistry(validMigrations), true);
});

test('27. Migration Registry Verification - Rejects inverted migration order', () => {
  const invertedMigrations = [
    { name: '20261028_205141_add_r2_storage', up: async () => {}, down: async () => {} },
    { name: '20261031_180935_initial_schema_from_empty', up: async () => {}, down: async () => {} },
  ];
  assert.throws(() => verifyMigrationRegistry(invertedMigrations), /Migration sequence mismatch at index \[0\]/);
});

test('28. Migration Registry Verification - Rejects missing up/down function', () => {
  const invalidMigrations = [
    { name: '20261031_180935_initial_schema_from_empty', up: null, down: async () => {} },
    { name: '20261028_205141_add_r2_storage', up: async () => {}, down: async () => {} },
  ];
  assert.throws(() => verifyMigrationRegistry(invalidMigrations), /missing a valid "up" function/);
});

test('29. Post-Migration Schema Verification - Succeeds when all tables, columns, and records exist', async () => {
  const mockQuery = async (sql) => {
    if (sql.includes('payload_migrations')) {
      return [
        { name: '20261031_180935_initial_schema_from_empty', batch: 1 },
        { name: '20261028_205141_add_r2_storage', batch: 1 },
      ];
    }
    if (sql.includes('information_schema.tables')) {
      return REQUIRED_CMS_TABLES.map((t) => ({ table_name: t }));
    }
    if (sql.includes('information_schema.columns')) {
      return [{ column_name: '_objectkey' }];
    }
    return [];
  };

  const result = await verifyPostMigrationSchema(mockQuery);
  assert.equal(result.migrationsCount, 2);
  assert.equal(result.tablesVerified, REQUIRED_CMS_TABLES.length);
  assert.equal(result.r2ColumnPresent, true);
});

test('30. Post-Migration Schema Verification - Rejects missing migration record', async () => {
  const mockQuery = async (sql) => {
    if (sql.includes('payload_migrations')) {
      return [{ name: '20261031_180935_initial_schema_from_empty', batch: 1 }];
    }
    if (sql.includes('information_schema.tables')) {
      return REQUIRED_CMS_TABLES.map((t) => ({ table_name: t }));
    }
    if (sql.includes('information_schema.columns')) {
      return [{ column_name: '_objectkey' }];
    }
    return [];
  };

  await assert.rejects(
    () => verifyPostMigrationSchema(mockQuery),
    /Missing migration record in payload_migrations: "20261028_205141_add_r2_storage"/
  );
});

test('31. Post-Migration Schema Verification - Rejects missing table', async () => {
  const mockQuery = async (sql) => {
    if (sql.includes('payload_migrations')) {
      return [
        { name: '20261031_180935_initial_schema_from_empty', batch: 1 },
        { name: '20261028_205141_add_r2_storage', batch: 1 },
      ];
    }
    if (sql.includes('information_schema.tables')) {
      return REQUIRED_CMS_TABLES.filter((t) => t !== 'media').map((t) => ({ table_name: t }));
    }
    if (sql.includes('information_schema.columns')) {
      return [{ column_name: '_objectkey' }];
    }
    return [];
  };

  await assert.rejects(
    () => verifyPostMigrationSchema(mockQuery),
    /Missing tables: media/
  );
});

test('32. Post-Migration Schema Verification - Rejects missing media._objectkey column', async () => {
  const mockQuery = async (sql) => {
    if (sql.includes('payload_migrations')) {
      return [
        { name: '20261031_180935_initial_schema_from_empty', batch: 1 },
        { name: '20261028_205141_add_r2_storage', batch: 1 },
      ];
    }
    if (sql.includes('information_schema.tables')) {
      return REQUIRED_CMS_TABLES.map((t) => ({ table_name: t }));
    }
    if (sql.includes('information_schema.columns')) {
      return [];
    }
    return [];
  };

  await assert.rejects(
    () => verifyPostMigrationSchema(mockQuery),
    /Column verification failed: "media\._objectkey" does not exist/
  );
});

test('33. Post-Migration Schema Verification - Handles already-completed migrations idempotently', async () => {
  const mockQuery = async (sql) => {
    if (sql.includes('payload_migrations')) {
      return [
        { name: '20261031_180935_initial_schema_from_empty', batch: 1 },
        { name: '20261028_205141_add_r2_storage', batch: 1 },
        { name: 'future_migration_example', batch: 2 },
      ];
    }
    if (sql.includes('information_schema.tables')) {
      return REQUIRED_CMS_TABLES.map((t) => ({ table_name: t }));
    }
    if (sql.includes('information_schema.columns')) {
      return [{ column_name: '_objectkey' }];
    }
    return [];
  };

  const result = await verifyPostMigrationSchema(mockQuery);
  assert.equal(result.migrationsCount, 3);
  assert.equal(result.r2ColumnPresent, true);
});

// =========================================================================
// Correction 3: Complete Migration Orchestration Tests (Mock-Based)
// =========================================================================

const validBaseEnv = {
  VERCEL: '1',
  VERCEL_ENV: 'preview',
  VERCEL_GIT_COMMIT_REF: 'staging',
  RUN_STAGING_MIGRATION: 'true',
  DATABASE_URI: `postgres://postgres.${STAGING_PROJECT_REF}:secret@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`,
};

const validMockMigrations = [
  { name: '20261031_180935_initial_schema_from_empty', up: async () => {}, down: async () => {} },
  { name: '20261028_205141_add_r2_storage', up: async () => {}, down: async () => {} },
];

const createStandardMockQuery = () => async (sql) => {
  if (sql.includes('payload_migrations')) {
    return [
      { name: '20261031_180935_initial_schema_from_empty', batch: 1 },
      { name: '20261028_205141_add_r2_storage', batch: 1 },
    ];
  }
  if (sql.includes('information_schema.tables')) {
    return REQUIRED_CMS_TABLES.map((t) => ({ table_name: t }));
  }
  if (sql.includes('information_schema.columns')) {
    return [{ column_name: '_objectkey' }];
  }
  return [];
};

test('34. Orchestration - Environment validation occurs before Payload initialization', async () => {
  let getPayloadCalled = false;
  const env = { ...validBaseEnv, VERCEL: '0' };

  await assert.rejects(
    () =>
      runStagingMigration({
        env,
        getPayload: async () => {
          getPayloadCalled = true;
          return {};
        },
      }),
    /VERCEL !== "1"/
  );

  assert.equal(getPayloadCalled, false, 'getPayload must never be called when environment validation fails');
});

test('35. Orchestration - Invalid database targets never call getPayload()', async () => {
  let getPayloadCalled = false;
  const env = {
    ...validBaseEnv,
    DATABASE_URI: `postgres://postgres.${PRODUCTION_PROJECT_REF}:secret@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres`,
  };

  await assert.rejects(
    () =>
      runStagingMigration({
        env,
        getPayload: async () => {
          getPayloadCalled = true;
          return {};
        },
      }),
    /targets PRODUCTION Supabase/
  );

  assert.equal(getPayloadCalled, false, 'getPayload must never be called when DATABASE_URI targets production');
});

test('36. Orchestration - Missing migration trigger prevents migration execution', async () => {
  let getPayloadCalled = false;
  const env = { ...validBaseEnv, RUN_STAGING_MIGRATION: undefined };

  await assert.rejects(
    () =>
      runStagingMigration({
        env,
        getPayload: async () => {
          getPayloadCalled = true;
          return {};
        },
      }),
    /RUN_STAGING_MIGRATION !== "true"/
  );

  assert.equal(getPayloadCalled, false, 'getPayload must never be called when trigger flag is missing');
});

test('37. Orchestration - Exact registered migration array is passed to payload.db.migrate({ migrations })', async () => {
  let passedMigrations = null;
  let poolClosed = false;

  const mockPayload = {
    db: {
      migrate: async ({ migrations }) => {
        passedMigrations = migrations;
      },
      pool: {
        query: createStandardMockQuery(),
        end: async () => {
          poolClosed = true;
        },
      },
    },
  };

  await runStagingMigration({
    env: validBaseEnv,
    migrations: validMockMigrations,
    getPayload: async () => mockPayload,
  });

  assert.deepEqual(passedMigrations, validMockMigrations);
  assert.equal(poolClosed, true, 'Pool should be closed after execution');
});

test('38. Orchestration - Migration execution failure still closes database pool', async () => {
  let poolClosed = false;

  const mockPayload = {
    db: {
      migrate: async () => {
        throw new Error('Database disk error during migration');
      },
      pool: {
        query: createStandardMockQuery(),
        end: async () => {
          poolClosed = true;
        },
      },
    },
  };

  await assert.rejects(
    () =>
      runStagingMigration({
        env: validBaseEnv,
        migrations: validMockMigrations,
        getPayload: async () => mockPayload,
      }),
    /Database disk error during migration/
  );

  assert.equal(poolClosed, true, 'Database pool must be closed even if migration throws');
});

test('39. Orchestration - Post-migration verification failure still closes database pool', async () => {
  let poolClosed = false;

  const mockPayload = {
    db: {
      migrate: async () => {},
      pool: {
        query: async (sql) => {
          // Missing media table
          if (sql.includes('information_schema.tables')) {
            return [];
          }
          return [];
        },
        end: async () => {
          poolClosed = true;
        },
      },
    },
  };

  await assert.rejects(
    () =>
      runStagingMigration({
        env: validBaseEnv,
        migrations: validMockMigrations,
        getPayload: async () => mockPayload,
      }),
    /Post-Migration Check/
  );

  assert.equal(poolClosed, true, 'Database pool must be closed when verification fails');
});

test('40. Orchestration - Successful execution performs verification and closes pool', async () => {
  let poolClosed = false;
  let queryCount = 0;

  const standardQuery = createStandardMockQuery();

  const mockPayload = {
    db: {
      migrate: async () => {},
      pool: {
        query: async (sql) => {
          queryCount++;
          const rows = await standardQuery(sql);
          // Return standard node-postgres QueryResult object
          return { rows };
        },
        end: async () => {
          poolClosed = true;
        },
      },
    },
  };

  const audit = await runStagingMigration({
    env: validBaseEnv,
    migrations: validMockMigrations,
    getPayload: async () => mockPayload,
  });

  assert.equal(audit.migrationsCount, 2);
  assert.equal(audit.tablesVerified, REQUIRED_CMS_TABLES.length);
  assert.equal(audit.r2ColumnPresent, true);
  assert.ok(queryCount >= 3, 'All post-migration verification queries must be executed');
  assert.equal(poolClosed, true, 'Database pool must be closed on successful completion');
});
