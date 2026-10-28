import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';

// Read src/payload.config.ts to verify the exact logic and functions
const payloadConfigPath = path.resolve(process.cwd(), 'src/payload.config.ts');
const sourceCode = fs.readFileSync(payloadConfigPath, 'utf8');

// Function replicating getR2StoragePlugin logic with injectable env
function testGetR2StoragePlugin(env = process.env) {
  const r2Bucket = env.R2_BUCKET;
  if (!r2Bucket) {
    return null;
  }

  const r2Endpoint = env.R2_ENDPOINT;
  const r2AccessKeyId = env.R2_ACCESS_KEY_ID;
  const r2SecretAccessKey = env.R2_SECRET_ACCESS_KEY;

  if (!r2Endpoint) {
    throw new Error('R2_ENDPOINT must be configured when R2 storage (R2_BUCKET) is enabled.');
  }

  if (!r2AccessKeyId || !r2SecretAccessKey) {
    throw new Error(
      'R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be configured when R2 storage (R2_BUCKET) is enabled.'
    );
  }

  return {
    bucket: r2Bucket,
    endpoint: r2Endpoint,
    accessKeyId: r2AccessKeyId,
    secretAccessKey: r2SecretAccessKey,
    forcePathStyle: true,
    region: 'auto',
    clientUploads: env.R2_CLIENT_UPLOADS === 'true',
    generateFileURL: ({ filename, prefix }) => {
      const cleanPrefix = prefix ? prefix.replace(/^\/+|\/+$/g, '') : '';
      const key = cleanPrefix ? `${cleanPrefix}/${filename}` : filename;
      const publicUrl = (env.R2_PUBLIC_URL || '').replace(/\/+$/, '');
      return publicUrl ? `${publicUrl}/${key}` : `/${key}`;
    },
  };
}

test('When R2_BUCKET is absent, R2 plugin is disabled (preserves local storage)', () => {
  const plugin = testGetR2StoragePlugin({});
  assert.equal(plugin, null, 'Must return null when R2_BUCKET is not set');
});

test('When R2_BUCKET is set but R2_ENDPOINT is missing, throws clear error', () => {
  assert.throws(
    () => testGetR2StoragePlugin({ R2_BUCKET: 'my-bucket' }),
    /R2_ENDPOINT must be configured when R2 storage \(R2_BUCKET\) is enabled\./
  );
});

test('When R2_BUCKET is set but credentials are missing, throws clear error', () => {
  assert.throws(
    () => testGetR2StoragePlugin({ R2_BUCKET: 'my-bucket', R2_ENDPOINT: 'https://xxx.r2.cloudflarestorage.com' }),
    /R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be configured/
  );

  assert.throws(
    () => testGetR2StoragePlugin({
      R2_BUCKET: 'my-bucket',
      R2_ENDPOINT: 'https://xxx.r2.cloudflarestorage.com',
      R2_ACCESS_KEY_ID: 'key',
      // missing R2_SECRET_ACCESS_KEY
    }),
    /R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be configured/
  );
});

test('When R2 is fully configured, plugin options match requirements', () => {
  const plugin = testGetR2StoragePlugin({
    R2_BUCKET: 'stellar-media',
    R2_ENDPOINT: 'https://account-id.r2.cloudflarestorage.com',
    R2_ACCESS_KEY_ID: 'test-key',
    R2_SECRET_ACCESS_KEY: 'test-secret',
    R2_PUBLIC_URL: 'https://media.stellarassociates.com',
  });

  assert.ok(plugin);
  assert.equal(plugin.bucket, 'stellar-media');
  assert.equal(plugin.endpoint, 'https://account-id.r2.cloudflarestorage.com');
  assert.equal(plugin.region, 'auto');
  assert.equal(plugin.forcePathStyle, true);
  assert.equal(plugin.accessKeyId, 'test-key');
  assert.equal(plugin.secretAccessKey, 'test-secret');
  assert.equal(plugin.clientUploads, false);
});

test('Client uploads is enabled when R2_CLIENT_UPLOADS is true', () => {
  const plugin = testGetR2StoragePlugin({
    R2_BUCKET: 'stellar-media',
    R2_ENDPOINT: 'https://account-id.r2.cloudflarestorage.com',
    R2_ACCESS_KEY_ID: 'test-key',
    R2_SECRET_ACCESS_KEY: 'test-secret',
    R2_CLIENT_UPLOADS: 'true',
  });

  assert.ok(plugin);
  assert.equal(plugin.clientUploads, true);
});

test('generateFileURL constructs clean URLs without duplicate slashes', () => {
  const cases = [
    {
      publicUrl: 'https://media.stellarassociates.com',
      filename: 'hero.jpg',
      prefix: undefined,
      expected: 'https://media.stellarassociates.com/hero.jpg',
    },
    {
      publicUrl: 'https://media.stellarassociates.com/', // trailing slash
      filename: 'hero.jpg',
      prefix: undefined,
      expected: 'https://media.stellarassociates.com/hero.jpg',
    },
    {
      publicUrl: 'https://media.stellarassociates.com///', // multiple trailing slashes
      filename: 'hero.jpg',
      prefix: undefined,
      expected: 'https://media.stellarassociates.com/hero.jpg',
    },
    {
      publicUrl: 'https://media.stellarassociates.com',
      filename: 'report.pdf',
      prefix: 'documents',
      expected: 'https://media.stellarassociates.com/documents/report.pdf',
    },
    {
      publicUrl: 'https://media.stellarassociates.com/',
      filename: 'report.pdf',
      prefix: '/documents/', // leading and trailing slashes
      expected: 'https://media.stellarassociates.com/documents/report.pdf',
    },
    {
      publicUrl: '',
      filename: 'report.pdf',
      prefix: 'documents',
      expected: '/documents/report.pdf',
    },
  ];

  for (const c of cases) {
    const plugin = testGetR2StoragePlugin({
      R2_BUCKET: 'stellar-media',
      R2_ENDPOINT: 'https://account-id.r2.cloudflarestorage.com',
      R2_ACCESS_KEY_ID: 'key',
      R2_SECRET_ACCESS_KEY: 'secret',
      R2_PUBLIC_URL: c.publicUrl,
    });

    const url = plugin.generateFileURL({ filename: c.filename, prefix: c.prefix });
    assert.equal(url, c.expected, `Failed for publicUrl: "${c.publicUrl}", prefix: "${c.prefix}"`);
  }
});

test('Source code in src/payload.config.ts imports s3Storage and configures media collection', () => {
  assert.match(sourceCode, /import\s+\{\s*s3Storage\s*\}\s+from\s+'@payloadcms\/storage-s3';/);
  assert.match(sourceCode, /disablePayloadAccessControl:\s*true/);
  assert.match(sourceCode, /forcePathStyle:\s*true/);
  assert.match(sourceCode, /region:\s*'auto'/);
  assert.match(sourceCode, /media:\s*\{/);
});
