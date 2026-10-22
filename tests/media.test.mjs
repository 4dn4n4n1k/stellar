import assert from 'node:assert';
import { test, describe } from 'node:test';
import { Media, ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from '../src/collections/Media.ts';
import { Publications } from '../src/collections/Publications.ts';

describe('Media Collection Security and Restrictions', () => {
  test('upload configuration specifies staticDir and restricted MIME types', () => {
    assert.strictEqual(Media.slug, 'media');
    assert.ok(Media.upload, 'Upload configuration must be active');
    assert.ok(Media.upload.staticDir, 'staticDir must be set');
    assert.strictEqual(Media.timestamps, true);

    // Verify allowed MIME types
    const expectedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/avif',
      'application/pdf',
    ];
    assert.deepStrictEqual([...ALLOWED_MIME_TYPES], expectedTypes);
    assert.deepStrictEqual(Media.upload.mimeTypes, expectedTypes);
  });

  test('contains required alt text and optional caption fields', () => {
    const fieldMap = new Map(Media.fields.map((f) => [f.name, f]));

    const alt = fieldMap.get('alt');
    assert.ok(alt, 'alt field exists');
    assert.strictEqual(alt.type, 'text');
    assert.strictEqual(alt.required, true);

    const caption = fieldMap.get('caption');
    assert.ok(caption, 'caption field exists');
    assert.strictEqual(caption.type, 'textarea');
    assert.strictEqual(caption.required, undefined);
  });

  test('file size limit is explicitly set to 25MB', () => {
    assert.strictEqual(MAX_FILE_SIZE_BYTES, 25 * 1024 * 1024);
  });
});

describe('Media Access Controls', () => {
  const adminUser = { id: 1, role: 'admin', email: 'admin@stellar.com' };
  const editorUser = { id: 2, role: 'editor', email: 'editor@stellar.com' };

  test('public visitors can view/read media assets', () => {
    assert.strictEqual(Media.access.read(), true);
  });

  test('public visitors CANNOT upload files', () => {
    assert.strictEqual(Media.access.create({ req: { user: null } }), false);
  });

  test('public visitors CANNOT update files', () => {
    assert.strictEqual(Media.access.update({ req: { user: null } }), false);
  });

  test('public visitors CANNOT delete files', () => {
    assert.strictEqual(Media.access.delete({ req: { user: null } }), false);
  });

  test('authenticated staff can upload and update files', () => {
    assert.strictEqual(Media.access.create({ req: { user: adminUser } }), true);
    assert.strictEqual(Media.access.create({ req: { user: editorUser } }), true);
    assert.strictEqual(Media.access.update({ req: { user: adminUser } }), true);
    assert.strictEqual(Media.access.update({ req: { user: editorUser } }), true);
  });

  test('only admin users can delete media assets', () => {
    assert.strictEqual(Media.access.delete({ req: { user: editorUser } }), false);
    assert.strictEqual(Media.access.delete({ req: { user: adminUser } }), true);
  });
});

describe('Media Upload Validation Hook', () => {
  const beforeValidateHook = Media.hooks.beforeValidate[0];

  test('accepts valid JPEG and PNG images within size limit', () => {
    const validImage = {
      name: 'report-cover.png',
      mimetype: 'image/png',
      size: 1.5 * 1024 * 1024, // 1.5 MB
    };

    assert.doesNotThrow(() => {
      beforeValidateHook({
        req: { file: validImage },
        data: { alt: 'Report Cover' },
      });
    });
  });

  test('accepts valid PDF documents within size limit', () => {
    const validPdf = {
      name: 'democratic-governance-2026.pdf',
      mimetype: 'application/pdf',
      size: 8 * 1024 * 1024, // 8 MB
    };

    assert.doesNotThrow(() => {
      beforeValidateHook({
        req: { file: validPdf },
        data: { alt: 'Governance Report PDF' },
      });
    });
  });

  test('rejects unsupported executable and script file types', () => {
    const dangerousFiles = [
      { name: 'malware.exe', mimetype: 'application/x-msdownload', size: 1024 },
      { name: 'script.js', mimetype: 'text/javascript', size: 1024 },
      { name: 'shell.sh', mimetype: 'application/x-sh', size: 1024 },
      { name: 'payload.php', mimetype: 'application/x-httpd-php', size: 1024 },
    ];

    for (const dangerousFile of dangerousFiles) {
      assert.throws(
        () => {
          beforeValidateHook({
            req: { file: dangerousFile },
            data: { alt: 'Dangerous File' },
          });
        },
        /Forbidden file type/,
        `Should reject ${dangerousFile.mimetype}`
      );
    }
  });

  test('rejects oversized files exceeding 25MB limit', () => {
    const oversizedPdf = {
      name: 'huge-archive.pdf',
      mimetype: 'application/pdf',
      size: 30 * 1024 * 1024, // 30 MB (> 25MB)
    };

    assert.throws(
      () => {
        beforeValidateHook({
          req: { file: oversizedPdf },
          data: { alt: 'Oversized PDF' },
        });
      },
      /File exceeds maximum upload size/,
      'Should reject files > 25MB'
    );
  });
});

describe('Compatibility with Publications Collection', () => {
  test('Publications coverImage and document relate to media collection', () => {
    const fieldMap = new Map(Publications.fields.map((f) => [f.name, f]));

    const coverImage = fieldMap.get('coverImage');
    assert.strictEqual(coverImage.type, 'relationship');
    assert.strictEqual(coverImage.relationTo, 'media');
    assert.deepStrictEqual(coverImage.filterOptions, {
      mimeType: {
        contains: 'image/',
      },
    });

    const document = fieldMap.get('document');
    assert.strictEqual(document.type, 'relationship');
    assert.strictEqual(document.relationTo, 'media');
    assert.deepStrictEqual(document.filterOptions, {
      mimeType: {
        equals: 'application/pdf',
      },
    });
  });
});
