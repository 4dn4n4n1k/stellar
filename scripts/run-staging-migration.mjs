#!/usr/bin/env node
/**
 * Stellar Associates - Staging Cloud Migration Runner
 *
 * Designed exclusively for one-time execution in Vercel's cloud build environment
 * targeting the empty Staging Supabase database (rdqnljiefyudowbonjcb).
 *
 * Enforces strict fail-closed multi-gate safety checks.
 * NEVER connects to or modifies the Production database (nilktzjurqolrztpefwv).
 * NEVER logs passwords or complete connection strings.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const STAGING_PROJECT_REF = 'rdqnljiefyudowbonjcb';
export const PRODUCTION_PROJECT_REF = 'nilktzjurqolrztpefwv';
export const EXPECTED_POOLER_REGION = 'eu-west-2';

export const EXPECTED_MIGRATION_SEQUENCE = [
  '20261031_180935_initial_schema_from_empty',
  '20261028_205141_add_r2_storage',
];

export const REQUIRED_CMS_TABLES = [
  'users',
  'users_sessions',
  'contact_submissions',
  'media',
  'publications',
  '_publications_v',
  'team_members',
  'team_members_expertise',
  '_team_members_v',
  'associate_experts',
  '_associate_experts_v',
  'job_openings',
  '_job_openings_v',
  'pages',
  '_pages_v',
  'reusable_sections',
  '_reusable_sections_v',
  'payload_locked_documents',
  'payload_preferences',
  'payload_migrations',
];

/**
 * Gate 1: Strict Environment Context Validation
 */
export function validateEnvironment(env = process.env) {
  if (env.VERCEL !== '1') {
    throw new Error(
      `[Safety Guard] VERCEL !== "1" (got "${env.VERCEL}"). Runner only operates inside Vercel cloud environment.`
    );
  }

  if (env.VERCEL_ENV !== 'preview') {
    throw new Error(
      `[Safety Guard] VERCEL_ENV !== "preview" (got "${env.VERCEL_ENV}"). Runner is prohibited in "${env.VERCEL_ENV}".`
    );
  }

  if (env.VERCEL_GIT_COMMIT_REF !== 'staging') {
    throw new Error(
      `[Safety Guard] VERCEL_GIT_COMMIT_REF !== "staging" (got "${env.VERCEL_GIT_COMMIT_REF}"). Runner is prohibited on non-staging branches.`
    );
  }

  if (env.RUN_STAGING_MIGRATION !== 'true') {
    throw new Error(
      `[Safety Guard] RUN_STAGING_MIGRATION !== "true" (got "${env.RUN_STAGING_MIGRATION}"). Explicit trigger flag required.`
    );
  }

  return true;
}

/**
 * Gate 2: Database Target Identity Validation (Fail-Closed)
 */
export function validateDatabaseTarget(rawUri) {
  if (!rawUri || typeof rawUri !== 'string') {
    throw new Error('[Safety Guard] DATABASE_URI is missing or empty.');
  }

  let parsed;
  try {
    parsed = new URL(rawUri);
  } catch {
    throw new Error('[Safety Guard] DATABASE_URI is malformed and cannot be parsed as a URL.');
  }

  const { protocol, hostname, username, port: rawPort, pathname } = parsed;
  const dbname = pathname.replace(/^\//, '');

  // 1. Connection Protocol Validation
  if (protocol !== 'postgres:' && protocol !== 'postgresql:') {
    throw new Error(
      `[Safety Guard] Invalid database protocol "${protocol}". Expected "postgres:" or "postgresql:".`
    );
  }

  // 2. Explicit Production Rejection
  if (
    hostname.includes(PRODUCTION_PROJECT_REF) ||
    username.includes(PRODUCTION_PROJECT_REF) ||
    hostname.includes('ap-northeast-1')
  ) {
    throw new Error(
      `[CRITICAL ALARM] DATABASE_URI targets PRODUCTION Supabase (${PRODUCTION_PROJECT_REF})! Aborting immediately.`
    );
  }

  // 3. Direct Connection Mode
  const isDirect = hostname === `db.${STAGING_PROJECT_REF}.supabase.co`;
  if (isDirect) {
    const port = rawPort || '5432';
    if (port !== '5432') {
      throw new Error(
        `[Safety Guard] Direct connection port mismatch: "${port}". Expected "5432".`
      );
    }

    if (username && username !== 'postgres') {
      throw new Error(
        `[Safety Guard] Direct connection username mismatch: "${username}". Expected "postgres".`
      );
    }

    return {
      mode: 'direct',
      host: hostname,
      port: 5432,
      user: 'postgres',
      database: dbname,
      project: STAGING_PROJECT_REF,
    };
  }

  // 4. Pooler Connection Mode
  const poolerRegex = /^aws-\d+-([a-z0-9-]+)\.pooler\.supabase\.com$/;
  const poolerMatch = hostname.match(poolerRegex);

  if (poolerMatch) {
    const region = poolerMatch[1];
    if (region !== EXPECTED_POOLER_REGION) {
      throw new Error(
        `[Safety Guard] Pooler region mismatch: "${region}". Expected "${EXPECTED_POOLER_REGION}".`
      );
    }

    const port = rawPort || '6543';
    if (port !== '6543') {
      throw new Error(
        `[Safety Guard] Pooler port mismatch: "${port}". Expected "6543".`
      );
    }

    const expectedPoolerUser = `postgres.${STAGING_PROJECT_REF}`;
    if (username !== expectedPoolerUser) {
      throw new Error(
        `[Safety Guard] Pooler username "${username}" is invalid. Must match exactly "${expectedPoolerUser}".`
      );
    }

    return {
      mode: 'pooler',
      host: hostname,
      port: 6543,
      region,
      user: expectedPoolerUser,
      database: dbname,
      project: STAGING_PROJECT_REF,
    };
  }

  // 5. Reject all unknown/unrecognized hostnames
  throw new Error(
    `[Safety Guard] Unrecognized database host "${hostname}". Expected direct (db.${STAGING_PROJECT_REF}.supabase.co) or pooler (*.${EXPECTED_POOLER_REGION}.pooler.supabase.com).`
  );
}

/**
 * Gate 3: Migration Registry Sequence Verification
 */
export function verifyMigrationRegistry(migrations) {
  if (!Array.isArray(migrations)) {
    throw new Error('[Safety Guard] Migrations registry export is not an array.');
  }

  if (migrations.length !== EXPECTED_MIGRATION_SEQUENCE.length) {
    throw new Error(
      `[Safety Guard] Expected exactly ${EXPECTED_MIGRATION_SEQUENCE.length} registered migrations, found ${migrations.length}.`
    );
  }

  for (let i = 0; i < EXPECTED_MIGRATION_SEQUENCE.length; i++) {
    const expectedName = EXPECTED_MIGRATION_SEQUENCE[i];
    const migration = migrations[i];

    if (!migration || typeof migration !== 'object') {
      throw new Error(`[Safety Guard] Migration at index [${i}] is invalid.`);
    }

    if (migration.name !== expectedName) {
      throw new Error(
        `[Safety Guard] Migration sequence mismatch at index [${i}]: expected "${expectedName}", got "${migration.name}".`
      );
    }

    if (typeof migration.up !== 'function') {
      throw new Error(
        `[Safety Guard] Migration "${migration.name}" is missing a valid "up" function.`
      );
    }

    if (typeof migration.down !== 'function') {
      throw new Error(
        `[Safety Guard] Migration "${migration.name}" is missing a valid "down" function.`
      );
    }
  }

  return true;
}

/**
 * Gate 4: Post-Migration Schema Verification
 * Queries payload_migrations, information_schema.tables, and information_schema.columns
 */
export async function verifyPostMigrationSchema(queryFn) {
  // 1. Verify payload_migrations records
  const migrationRows = await queryFn(
    `SELECT name, batch FROM "payload_migrations" ORDER BY id ASC;`
  );

  const completedNames = (migrationRows || []).map((r) => r.name);
  for (const expected of EXPECTED_MIGRATION_SEQUENCE) {
    if (!completedNames.includes(expected)) {
      throw new Error(
        `[Post-Migration Check] Missing migration record in payload_migrations: "${expected}".`
      );
    }
  }

  // 2. Verify all required CMS tables exist
  const tableRows = await queryFn(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
  );
  const existingTables = new Set((tableRows || []).map((r) => r.table_name));

  const missingTables = [];
  for (const requiredTable of REQUIRED_CMS_TABLES) {
    if (!existingTables.has(requiredTable)) {
      missingTables.push(requiredTable);
    }
  }

  if (missingTables.length > 0) {
    throw new Error(
      `[Post-Migration Check] Schema verification failed. Missing tables: ${missingTables.join(', ')}`
    );
  }

  // 3. Verify media._objectkey column exists
  const columnRows = await queryFn(
    `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'media' AND column_name = '_objectkey';`
  );

  if (!columnRows || columnRows.length === 0) {
    throw new Error(
      `[Post-Migration Check] Column verification failed: "media._objectkey" does not exist.`
    );
  }

  return {
    migrationsCount: completedNames.length,
    tablesVerified: REQUIRED_CMS_TABLES.length,
    r2ColumnPresent: true,
  };
}

/**
 * Main Migration Execution Pipeline
 */
export async function runStagingMigration(deps = {}) {
  const env = deps.env || process.env;
  const customGetPayload = deps.getPayload;
  const customMigrations = deps.migrations;
  const customQueryFn = deps.queryFn;

  console.log('========================================================');
  console.log('   Stellar Associates - Staging Cloud Migration Runner  ');
  console.log('========================================================\n');

  // 1. Validate Environment
  console.log('[Step 1/5] Validating environment context...');
  validateEnvironment(env);
  console.log('  ✓ Running in Vercel preview build container for branch "staging"');
  console.log('  ✓ Explicit RUN_STAGING_MIGRATION=true flag confirmed\n');

  // 2. Validate Database Identity
  console.log('[Step 2/5] Validating database target identity (fail-closed)...');
  const target = validateDatabaseTarget(env.DATABASE_URI);
  console.log(`  ✓ Host:     ${target.host}`);
  console.log(`  ✓ Mode:     ${target.mode}`);
  if (target.region) console.log(`  ✓ Region:   ${target.region}`);
  console.log(`  ✓ Port:     ${target.port}`);
  console.log(`  ✓ User:     ${target.user}`);
  console.log(`  ✓ Database: ${target.database}`);
  console.log(`  ✓ Target conclusively verified as Staging (${target.project})\n`);

  // 3. Ensure ESM resolution & Load Migration Registry
  console.log('[Step 3/5] Loading registered migrations...');
  process.env.PAYLOAD_MIGRATING = 'true';

  const rootDir = process.cwd();
  const pkgPath = path.resolve(rootDir, 'package.json');
  let originalPkgText = null;
  let pkgModified = false;

  let migrations;
  let config;
  let payload;

  try {
    if (customMigrations) {
      migrations = customMigrations;
      verifyMigrationRegistry(migrations);
    } else {
      originalPkgText = fs.readFileSync(pkgPath, 'utf8');
      // Ensure Node treats module specifiers cleanly during dynamic import
      const pkg = JSON.parse(originalPkgText);
      if (!pkg.type) {
        pkg.type = 'module';
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        pkgModified = true;
      }

      const { tsImport } = await import('tsx/esm/api');
      const indexUrl = pathToFileURL(path.resolve(rootDir, 'src/migrations/index.ts')).href;
      const migrationsModule = await tsImport(indexUrl, import.meta.url);
      migrations = migrationsModule.migrations;

      verifyMigrationRegistry(migrations);
    }

    console.log(`  ✓ Loaded ${migrations.length} registered migrations in exact sequence:`);
    migrations.forEach((m, i) => console.log(`    [${i}] ${m.name}`));
    console.log('');

    // 4. Initialize Payload Core
    console.log('[Step 4/5] Initializing Payload CMS instance...');
    if (customGetPayload) {
      payload = await customGetPayload({
        config: {},
        disableOnInit: true,
      });
    } else {
      const configUrl = pathToFileURL(path.resolve(rootDir, 'src/payload.config.ts')).href;
      const { tsImport } = await import('tsx/esm/api');
      const configModule = await tsImport(configUrl, import.meta.url);
      config = await (configModule.default || configModule);

      const { getPayload } = await import('payload');
      payload = await getPayload({
        config,
        disableOnInit: true,
      });
    }
    console.log('  ✓ Payload CMS core and database pool initialized\n');

    // 5. Execute Migrations & Run Post-Migration Verification
    console.log('[Step 5/5] Executing migrations...');
    await payload.db.migrate({
      migrations,
    });
    console.log('  ✓ Migration execution completed successfully\n');

    console.log('[Verification] Performing post-migration schema integrity checks...');
    const queryFn = customQueryFn || (async (sql) => {
      if (!payload?.db?.pool?.query) {
        throw new Error('[Verification] Unable to acquire PostgreSQL pool query executor from payload.db.pool');
      }
      const res = await payload.db.pool.query(sql);
      if (Array.isArray(res)) return res;
      return res?.rows || [];
    });

    const audit = await verifyPostMigrationSchema(queryFn);
    console.log(`  ✓ Verified ${audit.migrationsCount} records in payload_migrations`);
    console.log(`  ✓ Verified ${audit.tablesVerified} core CMS tables exist in public schema`);
    console.log(`  ✓ Verified column media._objectkey exists`);
    console.log('\n========================================================');
    console.log('  SUCCESS: Staging database initialization is complete! ');
    console.log('========================================================\n');
    return audit;
  } finally {
    // Always restore package.json if temporarily modified
    if (pkgModified && originalPkgText) {
      fs.writeFileSync(pkgPath, originalPkgText);
    }

    // Always terminate database connection pool cleanly
    if (payload?.db?.pool?.end) {
      await payload.db.pool.end();
    }
  }
}

// Direct CLI entrypoint
const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  runStagingMigration().catch((err) => {
    console.error('\n[FATAL ERROR] Staging migration execution failed:');
    console.error(err.message || err);
    process.exit(1);
  });
}
